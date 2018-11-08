'use strict'

const debug = require('debug')('agent:main')
const os = require('os')
const http = require('./utils/http')
const cst = require('../constants')
const meta = require('./utils/meta')
const Transport = require('./transport')

module.exports = class Agent {
  /**
   * Init new agent
   * @param {Object} config Configuration
   * @param {String} config.publicKey
   * @param {String} config.secretKey
   * @param {String} config.appName
   * @param {String} [config.serverName]
   * @param {Object} process Process to send
   * @param {Function} cb Invoked with <err, agent>
   */
  constructor (config, proc, cb) {
    // Valid config
    if (!config ||
      typeof config.publicKey !== 'string' ||
      typeof config.secretKey !== 'string' ||
      typeof config.appName !== 'string' ||
      typeof proc !== 'object') {
      const err = new Error('You need to provide a valid configuration and process!')
      return cb ? cb(err) : err
    }
    debug(`New agent constructed with: [public: ${config.publicKey}, secret: ${config.secretKey}, app: ${config.appName}]`)
    if (!config.serverName) config.serverName = os.hostname().toLowerCase()
    this.config = config
    proc.unique_id = this.generateUniqueId()
    this.process = proc
    this.sendLogs = false // Options to override startLogging and stopLogging
    // Init transport (listen event emitter even if an error occur)
    this.transport = new Transport()
  }

  /**
   * Check credentials and start agent
   */
  async start () {
    return new Promise((resolve, reject) => {
      // Trying to check infos
      this.checkCredentials(this.config, (err, endpoints) => {
        if (err) return reject(err)

        // Connect to websocket
        this.transport.setConfig(endpoints.ws, {
          'X-KM-PUBLIC': this.config.publicKey,
          'X-KM-SECRET': this.config.secretKey,
          'X-KM-SERVER': this.config.serverName,
          'X-PM2-VERSION': cst.PM2_VERSION,
          'X-PROTOCOL-VERSION': cst.PROTOCOL_VERSION
        })
        return this.transport.connect((err) => {
          if (err) return reject(err)

          // Store config
          this.config.endpoint = endpoints.ws
          this.config.internalIp = meta.computeInternalIp()

          // Start sending status
          this.statusInterval = setInterval(this.sendStatus.bind(this), 1 * 1000) // each second
          this.listenForLogs()

          // Listening for endpoint update
          this.endpointUpdateInterval = setInterval(this.listenEndpointUpdate.bind(this), 5 * 60 * 1000) // each 5 min

          return resolve()
        })
      })
    }).catch(err => {
      debug(`Got an error on start pm2-agent-node: ${err.message}, retrying in 5sec...`)
      return setTimeout(this.start.bind(this), 5 * 1000)
    })
  }

  /**
   * Generate an unique ID
   */
  generateUniqueId () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
  }

  /**
   * Used to generate valid a process
   * @param {Object} process
   * @return {Object} process Valid process with default value
   */
  generateProcess (proc) {
    if (!proc.createdAt) proc.createdAt = new Date().getTime()
    return {
      pid: process.pid,
      name: this.config.appName,
      interpreter: proc.interpreter || 'node',
      restart_time: 0,
      created_at: proc.createdAt,
      exec_mode: 'fork_mode',
      watching: false,
      pm_uptime: process.uptime(),
      status: 'online',
      pm_id: 0,
      unique_id: proc.unique_id,

      cpu: meta.getCpuUsage(),
      memory: meta.getMemoryUsage(),

      versioning: proc.versioning || null,

      node_env: process.NODE_ENV || null,

      axm_actions: proc.axm_actions || [],
      axm_monitor: proc.axm_monitor || {},
      axm_options: proc.axm_options || {},
      axm_dynamic: proc.dynamic || {}
    }
  }

  /**
   * Ping root.keymetrics.io, compare current endpoint, and reconnect agent if needed
   */
  listenEndpointUpdate () {
    debug(`Check if endpoint was updated`)
    this.checkCredentials(this.config, (err, endpoints) => {
      if (err) return debug(`Got an error on check credentials: ${err.message}`)
      if (endpoints.ws === this.config.endpoint) return debug(`Endpoint wasn't updated`)

      // Update transport endpoint
      this.config.endpoint = endpoints.ws
      this.transport.endpoint = endpoints.ws
      this.transport.disconnect()
      this.transport.connect((err) => {
        if (err) return debug(`Got an error on websocket connection while endpoint update: ${err.message}`)
        return debug(`Websocket endpoint updated!`)
      })
    })
  }

  /**
   * Check credentials with API
   * @param {Object} config Configuration
   * @param {String} config.publicKey
   * @param {String} config.secretKey
   * @param {String} config.appName
   * @param {Function} cb Invoked with <err, endpoints>
   */
  checkCredentials (config, cb) {
    http.open({
      url: cst.ROOT_URL + '/api/node/verifyPM2',
      method: 'POST',
      data: {
        public_id: config.publicKey,
        private_id: config.secretKey,
        data: meta(config.publicKey, config.serverName)
      }
    }, (err, data) => {
      if (err) return cb(err)
      if (data.disabled === true || data.pending === true) return cb(new Error('Interactor disabled.'))
      if (data.active === false) return cb(new Error('Interactor not active.'))
      if (!data.endpoints) return cb(new Error(`Endpoints field not present (${JSON.stringify(data)}).`))
      return cb(null, data.endpoints)
    })
  }

  /**
   * Send status
   * @param {String} channel
   * @param {Object} payload
   */
  async send (channel, payload) {
    return this.transport.send({
      channel,
      payload: {
        ...payload,
        process: {
          pm_id: 0,
          name: this.config.appName,
          server: this.config.serverName,
          rev: null
        }
      }
    })
  }

  /**
   * Listen stdout and stderr to send logs
   */
  listenForLogs () {
    const send = this.send.bind(this, 'logs')
    let sendLogs = false // used for startLogging and stopLogging

    // Listen actions
    const reply = method => {
      this.transport.send({
        channel: 'trigger:pm2:result',
        payload: {
          ret: { err: null, data: `Log streaming ${sendLogs ? 'enabled' : 'disabled'}` },
          meta: {
            method_name: method,
            app_name: this.config.appName,
            machine_name: this.config.serverName,
            public_key: this.config.publicKey
          }
        }
      })
    }
    this.transport.on('trigger:pm2:action', (data) => {
      const method = data.method_name
      if (!['startLogging', 'stopLogging'].includes(method)) return // Don't listen that
      sendLogs = method === 'startLogging'
      debug(`${method} triggered`)
      return reply(method)
    })

    // Listen logs
    process.stdout.write = (function (write) {
      return function (...args) {
        write.apply(process.stdout, args)
        if (!this.sendLogs && !sendLogs) return // Don't send logs
        send({
          at: new Date().getTime(),
          data: args[0]
        })
      }
    }(process.stdout.write))

    process.stderr.write = (function (write) {
      return function (...args) {
        write.apply(process.stderr, args)
        if (!this.sendLogs && !sendLogs) return // Don't send logs
        send({
          at: new Date().getTime(),
          data: args[0]
        })
      }
    }(process.stderr.write))
  }

  /**
   * Send status
   */
  async sendStatus () {
    return this.transport.send({
      channel: 'status',
      payload: {
        data: {
          process: [this.generateProcess(this.process)],
          server: meta.getServerMeta()
        },
        server_name: this.config.serverName,
        internal_ip: this.config.internalIp,
        rev_con: true
      }
    })
  }
}
