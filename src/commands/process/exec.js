const { exec } = require('child_process');
const { RichEmbed } = require('discord.js');
const { owners_id } = require("../../../config.json");

exports.run = (client, message, args, color) => {
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
  
  if(!args.join(' ')) return args.missing(message, 'No parameter to execute. you\'re stuppid', this.help);
  const mu = Date.now();
  let command = `\`\`\`bash\n${args.join(' ')}\`\`\``;
  const emb = new RichEmbed()
  .setColor('#81FF00')
  .addField('📥 INPUT', command);
  exec(args.join(' '), async( error, stdout, stderr)=> {
  	if(stdout){
	  	let output = `\`\`\`bash\n${stdout}\`\`\``;
	  	if(stdout.length > 1024){
			output = await client.util.hastebin(stdout);
		  }
			emb.addField('📤OUTPUT', output);
  	}else if(stderr){
  	    emb.setColor('#FF0000');
	  	let error = `\`\`\`bash\n${stderr}\`\`\``;
	  	if(stderr.length > 1024){
			error = await client.util.hastebin(stderr);
		  }
			emb.addField('⛔ERROR', error);
  	}else{
	  	emb.addField('📤OUPUT', '```bash\n# Command executed successfully but returned no output.```');
  	}
	  return message.channel.send(emb.setFooter(`\`${Date.now() - mu}ms\``));
  });
})
}

exports.conf = {
  aliases: ['$', 'bash']
}

exports.help = {
  name: 'exec',
  description: 'Executes a command in the Terminal (Linux/macOS) or Command Prompt (Windows) and shows the output',
  usage: 'exec <args>',
  example: ['exec uptime'] 
}
