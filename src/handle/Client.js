const { Client, Collection } = require('discord.js');
const db = require('quick.db');

class Bot extends Client {
  constructor (opt) {
    super (opt);
        this.health = Object.seal({
      cpu: new Array(96).fill(0),
      prc: new Array(96).fill(0),
      ram: new Array(96).fill(0),
      cmd: new Array(96).fill(0), 
      pings: new Array(96).fill(0)
    });
    
    this.util = require('./util.js');
    this.config = require('../../config.json');
    this.eco = require('discord-economy');
    this.level = require('discord-leveling');
    this.db = new db.table('commandUsage');
    this.version = require('../../package.json').version;
} 
    updateStats() {
    const { heapTotal, heapUsed } = process.memoryUsage();
    const { loadavg } = require('os');
    this.health.cpu.shift();
    this.health.cpu.push(((loadavg()[0] * 10000) | 0) / 100);
    
    this.health.prc.shift();
    this.health.prc.push(((100 * (heapTotal / 1048576)) | 0) / 100);
    
    this.health.ram.shift();
		this.health.ram.push(((100 * (heapUsed / 1048576)) | 0) / 100);

		this.health.cmd.shift();
		this.health.cmd.push(0);
  }
}

module.exports = Bot;
