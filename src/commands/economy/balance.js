
exports.run = async(client, message, args, color, prefix) => {
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) user = message.author;
  if(user.bot) return message.reply(`Bot doesn't have a balance!`);
  
  const {balance} = await client.eco.FetchBalance(user.id);
  
if (balance == 0) {
  message.channel.send(`**${user.username}** doesn't have a ${client.config.coin} yet!`);
} else if(user.id === message.author.id) {
  message.channel.send(`You have ${client.config.coin_icon}${balance} ${client.config.coin}`)
} else {
  message.channel.send(`**${user.username}** have ${client.config.coin_icon}${balance} ${client.config.coin}`) 
}
} 

exports.conf = {
  aliases: ['bal', 'coins'], 
  cooldown: '5'
} 
exports.help = {
  name: 'balance', 
  description: 'check your balance or another user balance', 
  usage: 'balance [@SomeOne | id]', 
  example: ['balance @SomeOne', 'balance 123456789'] 
} 