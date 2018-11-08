const Discord = require("discord.js");
const cpuStat = require('cpu-stat');
const { dependencies } = require('../../../package.json');

exports.run = async(client, message, args, color, prefix) => {
  
  let guildsEval = await client.shard.broadcastEval('this.guilds.size')
  let channelsEval = await client.shard.broadcastEval('this.channels.size')
  let usersEval = await client.shard.broadcastEval('this.users.size')
    let botGuilds = guildsEval.reduce((prev, val) => prev + val)
    let botChannels = channelsEval.reduce((prev, val) => prev + val)
    let botUsers = usersEval.reduce((prev, val) => prev + val)
    
    cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }
      
      const embed = new Discord.RichEmbed()
		.setColor(color)
		.setThumbnail(client.user.displayAvatarURL)
		.setTitle('My current statistics')
		.setDescription(`\`\`\`asciidoc
Uptime         : ${client.util.parseDur(client.uptime)} 
Users          : ${botUsers.toLocaleString()}
Channels       : ${botChannels.toLocaleString()}
Servers        : ${botGuilds.toLocaleString()}
Discord.js     : v${Discord.version}
Node           : ${process.version}
Version Bot    : v${client.version}
Commands ran   : ${client.db.fetch('commandUsage')} 
CPU Usage      : ${percent.toFixed(2)} %
Memory Usage   : ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB\`\`\``)
  .addField('📌 Owners', `${client.config.owners_id.map(x => `${client.users.get(x).username}#${client.users.get(x).discriminator}`).join('•\n')}`) 
	.addField('📌 Dependencies', Object.entries(dependencies).map(x => parseDependencies(x[0], x[1])).join(', '));
      message.channel.send(embed) 
  })  
}

function parseDependencies (name, src){
	if(src.startsWith('github:')){
		const repo = src.replace('github:', '').split('/');
		return `[${name}](https://github.com/${repo[0]}/${repo[1].replace(/#.+/, '')})`;
	}
	return `[${name}](https://npmjs.com/${name})`;
}

exports.conf = {
  aliases: ['botinfo', 'about'], 
  cooldown: '5'
} 
exports.help = {
  name: 'stats', 
  description: 'show current statistic bot',
  usage: 'stats', 
  example: ['stats'] 
} 