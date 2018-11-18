exports.run = async(client, message, args, color, prefix) => {
	
var words = args.join(' ');
if(!words) return args.missing(message, 'no words provided', client.commands.get('choose').help);
var wordToArray = words.split(" ");

var random = wordToArray[Math.floor(Math.random() * wordToArray.length)];
message.channel.send(`👀 I choose \`${random}\``);

	} 
	
	exports.conf = {
		aliases: [], 
		cooldown: '0'
		} 
	exports.help = {
		name: 'choose', 
		description: 'Choose between 1 or more things\nIt accepts all parameters it gives (Also in quotes to account for spaces if used) and chooses a random one.', 
		usage: 'choose <words>', 
		example: ['choose anime manga', 'choose anime', 'choose manga'] 
		}