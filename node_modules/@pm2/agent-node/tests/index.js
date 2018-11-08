/* eslint-env mocha */

'use strict'

process.env.NODE_ENV = 'test'

const Agent = require('../src/index')
const assert = require('assert')
const transport = require('../src/transport')
const createAgent = (proc, cb) => {
  if (!cb) {
    cb = proc
    proc = null
  }
  transport.prototype.connect = (cb) => cb()
  module.exports = transport
  let tmp = Agent.prototype.checkCredentials
  Agent.prototype.checkCredentials = (config, cb) => cb(null, {ws: 'endpoint'})
  let config = {publicKey: 'public', secretKey: 'secret', appName: 'app'}
  new Agent(config, proc || {}, (err, agent) => cb(agent, (done) => { // eslint-disable-line
    Agent.prototype.checkCredentials = tmp
    return done()
  })) // eslint-disable-line
}

describe('Agent', _ => {
  describe('constructor', _ => {
    it('should return an error with bad configuration', (done) => {
      assert(new Agent() instanceof Error)
      assert(new Agent({}) instanceof Error)
      assert(new Agent({publicKey: ''}) instanceof Error)
      assert(new Agent({publicKey: '', secretKey: ''}) instanceof Error)
      assert(new Agent({publicKey: '', secretKey: '', appName: ''}) instanceof Error)
      assert(new Agent({publicKey: '', secretKey: '', appName: {}, proc: {}}) instanceof Error)
      assert(new Agent({publicKey: '', secretKey: '', appName: {}, proc: ''}) instanceof Error)
      return done()
    })
    it('should fail check credentials', (done) => {
      let tmp = Agent.prototype.checkCredentials
      Agent.prototype.checkCredentials = (config, cb) => cb(new Error('Test error'))
      let agent = new Agent({publicKey: 'public', secretKey: 'secret', appName: 'app'}, {}, (err) => { // eslint-disable-line
        assert(err instanceof Error)
        Agent.prototype.checkCredentials = tmp
        return done()
      })
    })
    it('should fail transport connect', (done) => {
      transport.prototype.connect = (cb) => cb(new Error('Test error'))
      module.exports = transport
      let tmp = Agent.prototype.checkCredentials
      Agent.prototype.checkCredentials = (config, cb) => cb(null, {ws: 'endpoint'})
      let agent = new Agent({publicKey: 'public', secretKey: 'secret', appName: 'app'}, {}, (err) => { // eslint-disable-line
        assert(err instanceof Error)
        Agent.prototype.checkCredentials = tmp
        return done()
      })
    })
    it('should save config and start sending status', (done) => {
      transport.prototype.connect = (cb) => cb()
      module.exports = transport
      let tmp = Agent.prototype.checkCredentials
      Agent.prototype.checkCredentials = (config, cb) => cb(null, {ws: 'endpoint'})
      let config = {publicKey: 'public', secretKey: 'secret', appName: 'app'}
      new Agent(config, {}, (err, agent) => { // eslint-disable-line
        assert(err === null)
        assert(agent.transport instanceof transport)
        assert(agent.config.publicKey === config.publicKey)
        assert(agent.config.secretKey === config.secretKey)
        assert(agent.config.appName === config.appName)
        assert(agent.config.endpoint === 'endpoint')
        assert(typeof agent.config.internalIp === 'string')
        assert(typeof agent.process.unique_id === 'string')
        clearInterval(agent.statusInterval)
        Agent.prototype.checkCredentials = tmp
        return done()
      })
    })
  })
  describe('generateUniqueId', _ => {
    it('should return unique id', (done) => {
      let ids = []
      for (let i = 0; i < 100; i++) {
        let id = Agent.prototype.generateUniqueId()
        assert(!ids.includes(id))
        ids.push(id)
      }
      return done()
    })
  })
  describe('generateProcess', _ => {
    let date = null
    it('should add created at', (done) => {
      createAgent((agent, next) => {
        let proc = agent.generateProcess(agent.process)
        assert(proc.pid === process.pid)
        assert(proc.name === agent.config.appName)
        assert(proc.interpreter === 'node')
        assert(proc.restart_time === 0)
        assert(proc.created_at instanceof Date)
        date = proc.created_at
        assert(proc.exec_mode === 'fork_mode')
        assert(proc.watching === false)
        assert(typeof proc.pm_uptime === 'number')
        assert(proc.status === 'online')
        assert(proc.pm_id === 0)
        assert(proc.unique_id === agent.process.unique_id)
        assert(typeof proc.cpu === 'number')
        assert(typeof proc.memory === 'number')
        assert(proc.versioning === null)
        assert(proc.node_env === 'TEST')
        assert(Array.isArray(proc.axm_actions))
        assert(typeof proc.axm_monitor === 'object')
        assert(typeof proc.axm_options === 'object')
        assert(typeof proc.axm_dynamic === 'object')
        return next(done)
      })
    })
    it('should return process', (done) => {
      createAgent((agent, next) => {
        let proc = agent.generateProcess(agent.process)
        assert(proc.created_at === date)
        return next(done)
      })
    })
    it('should return process with new axm action', (done) => {
      let configProc = {
        axm_actions: [{action_type: 'pm2', action_name: 'test'}]
      }
      createAgent(configProc, (agent, next) => {
        let proc = agent.generateProcess(agent.process)
        assert(proc.axm_actions[0].action_name === 'test')
        return next(done)
      })
    })
  })
  describe('checkCredentials', _ => {

  })
  describe('sendStatus', _ => {

  })
})
