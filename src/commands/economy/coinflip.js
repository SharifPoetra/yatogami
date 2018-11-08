exports.run = async(client, message, args, color, prefix) => {

  try {
  let guess = args[0];
  if(!guess || !['heads', 'tails'].includes(guess)) return args.missing(message, 'You need to use it correctly to make this command work', client.commands.get('coinflip').help);
  let bet = args[1];
  if(!bet) return args.missing(message, 'You need to use it correctly to make this command work', client.commands.get('coinflip').help);
    if(isNaN(bet)) return args.missing(message, 'Bet amount need to be number', client.commands.get('coinflip').help);
    client.eco.FetchBalance(message.author.id).then(async(i) => {
    if(i.balance < bet) {
    message.reply('You are betting more than you have!');
    } else {
  const m = await client.eco.Coinflip(message.author.id, guess, args[1]);
  message.channel.send(`You ${m.output} ${client.config.coin_icon}${args[1]}, Your ${client.config.coin} now: ${client.config.coin_icon}${m.newbalance} ${client.config.coin}`);
    }
    })
  } catch (e) {
    if(e.message === 'The user has insufficient funds.') {
   message.channel.send(e.message);
    }
  }
}

exports.conf = {
  aliases: ['cf'], 
  cooldown: '5'
} 

exports.help = {
  name: 'coinflip', 
  description: "Bet to guess the results be heads or tails.", 
  usage: 'coinflip <heads | tails> <bet>', 
  example: ['coinflip heads 10', 'coinflip tails 10'] 
} 