'use strict'

const WebSocket = require('ws')
const EventEmitter2 = require('eventemitter2').EventEmitter2
const debug = require('debug')('agent:transport')

module.exports = class WebsocketTransport extends EventEmitter2 {
  /**
   * Construct new websocket instance for specific endpoint
   */
  constructor () {
    super({
      wildcard: true,
      delimiter: ':'
    })
    this.endpoint = null
    this.headers = null
    this.ws = null
    this.pingInterval = null
  }

  /**
   * Set config for instance
   * @param {Object} headers Key-value with upgrade headers
   * @param {String} endpoint Websocket endpoint
   */
  setConfig (endpoint, headers) {
    debug(`Init new websocket transport with endpoint: ${endpoint} and headers: [${Object.keys(headers).map(header => `${header}: ${headers[header]}`).join(',')}]`)
    this.endpoint = endpoint
    this.headers = headers
  }

  /**
   * Connect to websocket server
   * @param {Function} cb Invoked with <err, ws>
   */
  connect (cb) {
    debug('Connect transporter to websocket server')

    try {
      this.ws = new WebSocket(this.endpoint, {
        perMessageDeflate: false,
        handshakeTimeout: 5 * 1000, // 5 seconds
        headers: this.headers
      })
    } catch (e) {
      return cb(e)
    }

    const onError = (err) => {
      this.ws.removeAllListeners()
      return cb(err)
    }
    this.ws.once('error', onError)
    this.ws.once('open', _ => {
      debug('Websocket connected')
      this.ws.removeListener('error', onError)
      this.ws.on('close', this.onClose.bind(this))
      // We don't handle errors (DNS issues...), ping will close/reopen if any error is found
      this.ws.on('error', err => debug(`Got an error with websocket connection: ${err.message}`))
      if (this.pingInterval) clearInterval(this.pingInterval)
      this.pingInterval = setInterval(this.ping.bind(this), 30 * 1000) // 30 seconds
      return cb(null, this.ws)
    })
    this.ws.on('ping', _ => {
      debug('Received ping! Pong sended!')
      this.ws.pong()
    })
    this.ws.on('message', this.onMessage.bind(this))
  }

  /**
   * When websocket connection is closed, try to reconnect
   */
  onClose () {
    debug(`Websocket connection is closed, try to reconnect`)
    this.ws.terminate()
    this.ws.removeAllListeners()
    return this.connect(err => debug(err ? `Got an error on websocket connection: ${err.message}` : 'Websocket connection successfuly reconnected'))
  }

  /**
   * Send to listeners
   * @param {String} rawData
   */
  onMessage (rawData) {
    let data = null
    try {
      data = JSON.parse(rawData)
    } catch (e) {
      return debug(`Get non-JSON data from websocket server: ${rawData}`)
    }
    if (!data.channel || !data.payload) return debug(`Get bad message from websocket server: ${rawData}`)
    return this.emit(data.channel, data.payload)
  }

  /**
   * Try to ping server, if we get no response, disconnect and try to reconnect
   */
  ping () {
    const noResponse = _ => {
      clearTimeout(timeout)
      debug('We can\'t get any response to ping from websocket server, trying to reconnect')
      this.ws.terminate()
      return this.connect(err => debug(err ? `Got an error on websocket connection: ${err.message}` : 'Websocket connection successfuly reconnected'))
    }
    const timeout = setTimeout(noResponse.bind(this), 5 * 1000) // 5 seconds timeout

    this.ws.ping((err) => {
      if (err) return noResponse()
      return debug('Successfuly sended a ping!')
    })
    this.ws.on('pong', _ => {
      clearTimeout(timeout)
      this.ws.removeEventListener('pong')
      return debug('Websocket server has replied to ping!')
    })
  }

  /**
   * Send data to websocket server
   * @param {Object} packet Packet to send (send with JSON)
   */
  send (packet) {
    if (!this.isConnected()) return false
    if (!packet.channel || !packet.payload) return false
    this.ws.send(JSON.stringify(packet))
    return true
  }

  /**
   * Disconnect from websocket server
   */
  disconnect () {
    debug('Disconnect from websocket server')
    return this.ws.close()
  }

  /**
   * Return if websocket is connected or not
   */
  isConnected () {
    return this.ws && this.ws.readyState < 2 // Connected or connecting
  }
}
