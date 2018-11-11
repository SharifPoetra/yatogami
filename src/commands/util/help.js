const { RichEmbed } = require('discord.js');
const { owners_id, bot_prefix } = require('../../../config.json')

exports.run = async (client, message, args, color) => {
  let prefix = bot_prefix;
  if (!args[0]) {
    let module = client.helps.array();
    if(!owners_id.includes(message.author.id)) module = client.helps.array().filter(x => !x.hide);
    const embed = new RichEmbed()
    .setColor(color)
    .setAuthor(client.user.username + ' Commands List', client.user.displayAvatarURL)
    .setDescription(`\nTo check the command usage, type \`${prefix}help <commands>\`\n`)
    .setFooter(`Don't include <> or [], it's mean <> is required and [] is optional 〖 Total: ${client.commands.size} 〗`)
    for (const mod of module) {
      embed.addField(`**${mod.name}**`, mod.cmds.map(x => `\`${x}\``).join(', '));
    }
    return message.channel.send(embed);
  } else {
    let cmd = args[0];
    if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      let name = `${command.help.name}`;
      let desc = command.help.description;
      let aliases = command.conf.aliases;
      let usage = `${prefix}${command.help.usage}`;
      let example = `${command.help.example.map(x => `▫ __**${x}**__`).join('\n')}`

      let embed = new RichEmbed()
      .setThumbnail('https://twemoji.maxcdn.com/2/72x72/2753.png') 
      .setTitle(`Command: ${name}`) 
      .addField('Description', desc)
      .addField('Aliases', aliases[0] ? `${aliases.join(`, `)}` : `No aliases`)
      .addField('Usage', usage)
      .addField('Example', example) 
      .setFooter(`Hooks such as [] or <> are not to be used when using commands.`) 
      .setColor(color) 
      return message.channel.send(embed);
    }
    if (!client.commands.has(cmd) || !client.commands.get(client.aliases.get(cmd))) {
			const xembed = new RichEmbed()
			.setColor('#FF1000')
			.setTitle('I don\'t have command like this');
			const search = client.commands.keyArray().filter(x => x.includes(args[0])).map(x => `▫ __**${x}**__`);
			search.length > 0 ? xembed.setDescription('**Are you mean this? :**\n' + search.join('\n')) : undefined;
			return message.channel.send(xembed);
    } 
      //message.channel.send(`**${message.author.username}**, Command or command alias \`${cmd}\` was not found.`);
    
  }
}

exports.conf = {
    aliases: ['h', 'cmds', 'cmdlist'],
    cooldown: "5"
}

exports.help = {
    name: 'help',
    description: 'Show all command list',
    usage: 'help [command]'
}
