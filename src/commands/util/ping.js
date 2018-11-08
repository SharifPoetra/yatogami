const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, color) => {
  
  	try{
		const m = await message.channel.send('Ping...');
		const embed = new RichEmbed()
    .setColor(color)
		.addField(' Latency', `__**${m.createdTimestamp - message.createdTimestamp}ms**__`)
		.addField(' API', `__**${Math.floor(client.ping)}ms**__`)
		return m.edit(`🏓 P${'o'.repeat(Math.floor(client.ping)%5 === 0 ? 0 : Math.floor(Math.random()*5))}ng..`, {embed: embed});
	}catch(e){
		return message.channel.send(`Oh no an error occured :( ${e.message} try again later`);
	}

}

exports.conf = {
    aliases: ['pong'],
    cooldown: "4"
}

exports.help = {
    name: "ping",
    description: "Check bot ping",
    usage: "ping", 
    example: ['ping'] 
}
