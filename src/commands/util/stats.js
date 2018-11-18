/*
MIT License
<<<<<<< HEAD
Copyright (c) 2018 OwO
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
=======


Copyright (c) 2018 OwO


Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

>>>>>>> 8ae1166da474be05c210ed44baad35af857541fc
SOFTWARE.
*/
/*
All Following Code by OwO#8287
*/

const Discord = require("discord.js");
const cpuStat = require('cpu-stat');
const { dependencies } = require('../../../package.json');
const { Canvas } = require('canvas-constructor');
const moment = require('moment');
require('moment-duration-format');

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
	if(args[0] === '--memory' || args[0] === '--mem' || args[0] === '--m'){
			const attachment = getChart(client.health);
			embed.attachFile({ attachment, name: 'memory.png' })
			.setImage('attachment://memory.png');
		}
     return message.channel.send(embed) 
  })  
}

function parseDependencies (name, src){
	if(src.startsWith('github:')){
		const repo = src.replace('github:', '').split('/');
		return `[${name}](https://github.com/${repo[0]}/${repo[1].replace(/#.+/, '')})`;
	}
	return `[${name}](https://npmjs.com/${name})`;
}

function getChart({prc, ram}){
	let canvas = new Canvas(481, 289)
	.setColor('white')
	.addRect(0,0,481,289)
	.setTextFont('10px Impact')
	.setTextAlign('right')
	.setColor('black');
	
	for(let i = 10; i >= 0; i--){
		const post = i*17+52;
		canvas = canvas.addText(String((-i+10)*10), 27, post)
	}
	
	for(let i = 0; i < 11; i++){
		const post = i*17+49;
		canvas = canvas.moveTo(38, post)
		.lineTo(466, post);
	}
	
	canvas = canvas.stroke()
	.setTextAlign('center');
	
	const moment = require('moment');
	const now = new Date();
	const terval = now.setHours(now.getHours() - 1);
	const dates = new Array(6).fill(terval)
	.map((x, i) => x-((-i+5)*6000)).map(x => moment(x).format('mm:ss'));
	for(let i = 0; i < 6; i++){
		const post = i*71+73;
		canvas = canvas.addText(String(dates[i]), post, 240);
	}
	
	canvas = canvas.setTextFont('15px Impact')
	.addText('RAM PERCENTAGE', 481/2, 28);
	
	const renders = [renderData(prc, '#FF8000', 'RAM (Total)', true), renderData(ram, '#3498DB', 'RAM (Used)', false)];
	for(const render of renders){
		canvas = canvas.addImage(render, 0, -7);
	}
	return canvas.toBuffer();
}

function renderData(arr, color, text, sec){
	let canvas = new Canvas(481, 289)
	const datas = arr.slice(-6);
	
	for(let i = 0; i < 6; i++){
		const postX = i*71+73;
		const postY = (-((datas[i]/100)*177)+177)+49;
		canvas = canvas.lineTo(postX, postY);
	}
	
	canvas = canvas.setStroke(color)
	.setLineWidth(2)
	.stroke()
	.save()
	.setColor(color);
	
	for(let i = 0; i < 6; i++){
		const postX = i*71+73;
		const postY = (-((datas[i]/100)*177)+177)+49;
		canvas = canvas.addCircle(postX, postY, 4);
	}
	
	canvas = canvas.setColor('black')
	.setTextFont('10px Impact')
	.setTextAlign('left')
	.addText(text, sec ? 269 : 178, 268)
	.setColor(color)
	.addRect(sec ? 250 : 161,258,13,13);
	
	return canvas.toBuffer();
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
