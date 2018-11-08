const { RichEmbed } = require('discord.js'), 
      db = require('quick.db');

exports.run = async(client, message, args, color, prefix) => {
  
 const regex = /(https?:\/\/)?(www\.)?(discord(\.|dot|\(dot\))(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/ig.test(message.content);

  var toNote = args.join(' ');
  if(!toNote) return args.missing(message, 'You need to specify test to set your profile description', client.commands.get('setinfo').help);
  
  if(regex) {
    message.channel.send('✅ Your profile description successfully changed');
    db.set(`note_${message.author.id}`, 'Discord invite links.');
  } else {
  
  message.channel.send('✅ Your profile description successfully changed') 
  db.set(`note_${message.author.id}`, toNote);
  } 
} 

exports.conf = {
  aliases: ['setbio'],
  cooldown: '5'
} 

exports.help = {
  name: 'setinfo', 
  description: 'Set your description profile', 
  usage: 'setinfo <text>', 
  example: ['setinfo Hallo World.', 'setinfo I\'am a good people in here'] 
} 