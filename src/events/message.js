const PREFIX = require('../../config.json').bot_prefix;

module.exports = async (client, message) => {
 
  if (message.author.bot || !message.guild) return;

    let prefix = PREFIX.toLowerCase();
    let prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    prefixMention = prefix;
    let msg = message.content.toLowerCase();
    
    if (msg.startsWith(prefix) || msg.startsWith(`${client.user.toString()} `)) {
        try {
        require('../handle/command')(client, message);
        } catch(e) {
            console.error(e);
        }
    } 
    if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
        message.channel.send(`Hye ${message.author}, my prefix is \`${prefix}\``);
    }
  
  let xpAdd = Math.floor(Math.random() * 1) + 1; 
  let xp = await client.level.Fetch(message.author.id);
  let curxp = xp.xp;
  let curlvl = xp.level;
  let nxtLvl = xp.level * 500;
  if(nxtLvl <= xp.xp) {
    message.channel.send(`\🆙 | ${message.author} You've leveled up to **\`${curlvl + 1}\`**`)
  client.level.AddLevel(message.author.id, 1);
  } 
  client.level.AddXp(message.author.id, xpAdd);
} 
