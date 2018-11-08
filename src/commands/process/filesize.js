const fs = require('fs');
const { owners_id } = require('../../../config.json');

exports.run = async(client, message, args, color, prefix) => {
  
  owners_id.forEach(async function(owner) {
    if(message.author.id !== owner) return;
  
  const file = args[0];
    if (!file) return message.channel.send("You must provide a file (and location if non-root file), and the correct syntax must be used.");

    try {
      const stats = fs.statSync(file);
      const fileBytes = stats["size"];
      const fileKB = fileBytes / 1024;

      message.channel.send(`\`${file}\` currently has a size of **${fileBytes}** bytes (${fileKB.toFixed(2)}KB).`);
    } catch (error) {
      if (error.code === "ENOENT") return message.channel.send(`The file \`${file}\` could not be found.`);
      else console.log(error);
    }
  })
  
} 

exports.conf = {
  aliases: ['fs'], 
  cooldown: '0'
} 
exports.help = {
  name: 'filesize', 
  description: 'Returns the value of the size of the specified file.', 
  usage: 'filesize <path>', 
  example: ['filesize ./src/commands/economy/coinflip.js']
} 