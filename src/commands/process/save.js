const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args, color, prefix) => {
  if (message.author.id != "475230849239875584") return;
  if (!args[0]) return message.channel.send("Please includes the content to be saved.");
  db.add(`myData`, 1);
  args = args.join(" ").split('--');
  const date = new Date();
  const myData = await db.fetch(`myData`);
  const embed = new Discord.RichEmbed()
    .setAuthor(`Data #${myData}`)
    .addField("Guild:", `${message.guild.name} (${message.guild.id})`, true)
    .addField("Channel:", `${message.channel.name} (${message.channel.id})`, true)
    .setFooter(`at ${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`);
  if (args[1] === "img") {
    embed.setDescription(args[0]);
    embed.setImage(args[0]);
  } else {
    embed.addField("Content", args, true);
  }
  client.channels.get("511726691228581889").send({
    embed
  }).catch((_) => message.channel.send("It seems like you\'re not giving valid format!"));
  message.channel.send("Successfully saved!").then(m => m.delete(7000));
};

exports.conf = {
  aliases: ['log'],
  cooldown: '0'
};

exports.help = {
  name: "save",
  description: "save data",
  usage: "save <content>",
  example: ['save this-is-my-data']
};