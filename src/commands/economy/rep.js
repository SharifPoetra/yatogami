const db = require('quick.db');
const fs = require("fs");
var ms = require('parse-ms');

exports.run = async(client, message, args, color) => {

  if (message.channel.type == "dm") return;  
  
    let cooldown = 8.64e+7,
    amount = 1
  
  let lastrep = await db.fetch(`lastRep_${message.author.id}`)
  if (lastrep !== null && cooldown - (Date.now() - lastrep) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastrep))
        let eh = require('../../../src/handle/cooldownAns.json');
        let ops = eh[Math.floor(Math.random() * eh.length)];
        message.channel.send(`**${message.author.username}**, ${ops} (Ratelimited)\n**You'll be able give reputation point again in ${timeObj.hours} hours, ${timeObj.minutes} minutes and ${timeObj.seconds} seconds**`)
    
  } else {
    
    if(!args[0]) return message.channel.send(`**${message.author.username}**, You can rep someone now,\nYou need to mention user to be given reputation!`);
    try {
    let user = message.mentions.users.first() || client.users.get(args[0]);
    if (user.bot) return message.channel.send(`**${message.author.username}**, You cannot rep a bot`);
    if (user.id == message.author.id) return message.channel.send(`**${message.author.username}**, You cannot rep yourselft!`);
      
      db.set(`lastRep_${message.author.id}`, Date.now());        
      db.add(`rep_${user.id}`, 1)
        message.channel.send(`**🎖️ | Hey <@${user.id}>, You got reputation points from ${message.author.tag}**`);
    } catch (e) {
      message.channel.send(e.message);
    } 
  } 
}

exports.conf = {
    aliases: ["reputation"],
    cooldown: "5"
}

exports.help = {
    name: 'rep',
    description: 'Give someone reputation point',
    usage: 'rep <@SomeOne | id>', 
    example: ['rep @Yatogami', 'rep 123456789']
}