const Discord = require('discord.js');
const nextsig = require("osunext-sig");

exports.run = (client, message, args) => {
	let account = args[0];
	let mode = args[1];
	if (!account) return args.missing(message, "provide an account you would like to search for!", client.commands.get('osu').help);
	
	if (!mode) { mode = 0 } // Default Game
	else if (mode.indexOf("o") == 0) { mode = 0 } // Standard
	else if (mode.indexOf("t") == 0) { mode = 1 } // Taiko
	else if (mode.indexOf("c") == 0) { mode = 2	} // Catch the Beat
	else if (mode.indexOf("m") == 0) { mode = 3	} // Mania
	else { mode = 0 }
    
  const img = new Discord.Attachment(`http://lemmmy.pw/osusig/sig.php?colour=hex8971d4&uname=${account}&mode=${mode}&pp=2&countryrank&darktriangles&xpbar&xpbarhex&onlineindicator=undefined`, `${account}.png`);
  message.channel.send(`:pencil: **Profile Link:** <https://new.ppy.sh/u/${account}>`, img);
}

exports.conf = {
  aliases: [] 
}

exports.help = {
  name: 'osu',
  description: 'Find out information on your osu account!',
  usage: 'osu <account> [o/t/c/m]', 
  example: ['osu mathi', 'osu idke'] 
}