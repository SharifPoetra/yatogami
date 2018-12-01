const Discord = require('discord.js');
var badges = require('../../assets/json/badgelist.json');
const db = require('quick.db');

exports.run = async(client, message, args, color, prefix) => {
  
  //if(message.author.id !== '475230849239875584') return message.channel.send('Maintenance...');
  if(!args.length) return args.missing(message, 'No method provided', client.commands.get('badge').help);
  let amount = 300;
  if (args[0] === 'buy') {
    
    let input = args[1];
    if (!input) return message.channel.send(`You need to input the emoji to buy or use \`${prefix}badge list\` to see the available emoji to be badges!`);
    if (!badges.includes(input)) {
      return message.channel.send(`The emoji you provide are not available in my inventory, Use \`${prefix}badge list\` to see available emoji to be badges!`)
    } else {
  let {balance} = await client.eco.FetchBalance(message.author.id);
      if (balance < amount) return message.channel.send(`**${message.author.username}**, You don't have ${client.config.coin_icon}${amount} ${client.config.coin} to buy badges!`);
      let bg = await db.fetch(`badge_${message.author.id}`) 
      if (bg !== null && bg.includes(input)) return message.channel.send('You already have that badges, try to buy another one.');

      let m = await message.channel.send(`${message.author.toString()}, Are you sure you want to purchase a ${input} with ${client.config.coin_icon}${amount} ${client.config.coin}? Answer with \`yes\` to continue or \`no\` to cancel purchasing.`) 
      const hit = await client.util.verifyText(message.channel, message.author);
      m.delete();
      if(hit) {
message.channel.send(`✅ ${client.config.coin_icon}${amount} ${client.config.coin} has been deducted and ${input} has been added to your profile to display!`)
  db.push(`badge_${message.author.id}`, input);
    client.eco.SubstractFromBalance(message.author.id, amount);
      } else {
        message.reply('Purchase canceled.');
      } 
    } 
  }
  
  if (args[0] === 'list') {
    let embed = new Discord.RichEmbed() 
    .setColor(color)
    .setThumbnail(client.user.displayAvatarURL) 
    .setAuthor(`${message.author.username}\'s opened badge shop list`, message.author.displayAvatarURL)
    .setTitle('List of emoji available to be a badge')
    .setDescription(`${badges.map(x => `${x}`).join(',  ')}`) 
    .addField('\u200B', `All of this badge are selled around ${client.config.coin_icon}${amount} ${client.config.coin}\n​`) 
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp() 
    return message.channel.send(embed);
  } 
} 

exports.conf = {
  aliases: [], 
  cooldown: '0'
} 
exports.help = {
  name: 'badge', 
  description: 'look at badge list, buy a badge and show to your friends', 
  usage: 'badge [list | buy] [emoji]', 
  example: ['badge list', 'badge buy 🔰']
} 