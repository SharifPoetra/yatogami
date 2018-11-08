const { RichEmbed } = require('discord.js'),
      db = require('quick.db');

exports.run = async(client, message, args, color, prefix) => {
  
  var user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) user = message.author;
  if(user.bot) return message.channel.send('Bots do not have profile!');
  
  const {level, xp} = await client.level.Fetch(user.id);
  const {balance} = await client.eco.FetchBalance(user.id);
  const rep = await db.fetch(`rep_${user.id}`);
  const note = await db.fetch(`note_${user.id}`);
  const badges = await db.fetch(`badge_${user.id}`);
  const marry = await db.fetch(`marry_${user.id}`);
  
  var embed = new RichEmbed() 
  .setColor(color)
  .setThumbnail(user.displayAvatarURL)
  .setAuthor(`${user.username}'s Profile`, user.displayAvatarURL) 
  .setDescription(`${note ? `${note}` : 'No description set.'}`) 
  .addField(`💵 ${client.config.coin}`, `${client.config.coin_icon} ${balance}`)
  .addField('⚡ Level', `${level} (XP: ${xp})`)
  .addField('🎖️ Reputation', `${rep ? `${rep}` : '0'}`)
  .addField('♥ Married with', `${marry ?  `${marry}` : 'Nobody'}`) 
  .addField('👝 Badges', `${badges ? `${badges}` : 'None.'}`)
  .setFooter(`Requested by ${message.author.username}`)
  .setTimestamp();
  message.channel.send(embed);
} 

exports.conf = {
  aliases: ['prfl'], 
  cooldown: '5'
} 

exports.help = {
  name: 'profile', 
  description: 'Retrieves your current user profile', 
  usage: 'profile [@SomeOne | id]', 
  example: ['profile @SomeOne', 'profile 123456789']
} 