exports.run = async(client, message, args, color, prefix) => {
  
  var roll = args[0];
  var amount = args[1];
 
   if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return args.missing(message, 'Specify the roll, it should be a number between 1-6', client.commands.get('dice').help);
   if (!amount) return args.missing(message, 'Specify the amount you want to gamble!', client.commands.get('dice').help);
 
   client.eco.FetchBalance(message.author.id).then((i) => {
   if (i.balance < amount) return message.reply('You have less coins than the amount you want to gamble!')
  })
 
   client.eco.Dice(message.author.id, roll, amount).then(m => {
 
  message.reply(`The dice rolled ${m.dice}. So you ${m.output}! You now have ${client.config.coin_icon}${m.newbalance} ${client.config.coin}`)
 }).catch(console.error)
} 
exports.conf = {
  aliases: [], 
  cooldown: '5'
} 
exports.help = {
  name: 'dice', 
  description: 'allow you to spend your balance in game of dice', 
  usage: 'dice <guess> <bet>', 
  example: ['dice 5 10'] 
} 