const snek = require('node-superfetch');
const nodeVersion = parseInt(process.versions.node.split('.'), 10);
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];

class Util {
	
	
	static async awaitPlayers(msg, max, min, { time = 30000, dmCheck = false } = {}) {
		const joined = [];
		joined.push(msg.author.id);
		const filter = res => {
			if (res.author.bot) return false;
			if (joined.includes(res.author.id)) return false;
			if (res.content.toLowerCase() !== 'join game') return false;
			joined.push(res.author.id);
			res.react('✅').catch(() => null);
			return true;
		};
		const verify = await msg.channel.awaitMessages(filter, { max, time });
		verify.set(msg.id, msg);
		if (dmCheck) {
			for (const message of verify.values()) {
				try {
					await message.author.send('Hi! Just testing that DMs work, pay this no mind.');
				} catch (err) {
					verify.delete(message.id);
				}
			}
		}
		if (verify.size < min) return false;
		return verify.map(message => message.author);
	}
  
  static userResolvable(input, message){
	const userPatern = /^(?:<@!?)?([0-9]+)>?$/;
	if(userPatern.test(input)) input = input.replace(userPatern, '$1');
	let members = message.guild.members;
	const filter = member => member.user.id === input
		|| member.displayName.toLowerCase() === input.toLowerCase()
		|| member.user.username.toLowerCase() === input.toLowerCase()
		|| member.user.tag.toLowerCase() === input.toLowerCase();
	return members.filter(filter).first();
}
  
  static async verifyText(channel, user, time = 30000) {
		const filter = res => {
			const value = res.content.toLowerCase();
			return res.author.id === user.id && (yes.includes(value) || no.includes(value));
		};
		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time
		});
		if (!verify.size) return 0;
		const choice = verify.first().content.toLowerCase();
		if (yes.includes(choice)) return true;
		if (no.includes(choice)) return false;
		return false;
	}
  
  static async getProgbar(current, max, length){
   const curBer = Math.floor((current/max)*length);
   let str = '';
   for(let i = 0; i < length; i++){
       str += i < curBer ? '✅' :'⬜'
   }
    return str;

  } 
  
  static delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
  static randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
  static shuffle (array){
    const arr = array.slice(0);
    for(let i = arr.length -1; i >= 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
  static async hastebin(text){
    const { body } = await snek.post('https://www.hastebin.com/documents')
    .send(text);
    return `https://www.hastebin.com/${body.key}`;
  }
  static chunk (array, chunkSize){
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
  }
  static parseDur(ms){
    let seconds = ms / 1000;
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    
    if (days) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    else if (hours) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    else if (minutes) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }
  static trimArray (array, length = 10){
    const len = array.length - length;
    const temp = array.slice(0, length);
    temp.push(`...${len} more.`);
    return temp;
  }
  static async verify(user, msg, time = 30000){
    await msg.react('🇾');
    await msg.react('🇳');
    const data = await msg.awaitReactions(reaction => reaction.users.has(user.id), { time: time, max: 1});
    if(data.firstKey() === '🇾') return true;
    return false;
  }
  static codeblock (string, code){
    return `\`\`\`${code}\n${string}\`\`\``;
  }
  static decodeHtmlEntities (text){
    return text.replace(/&#(\d+);/g, (rep, code) => {
      return String.fromCharCode(code)
    });
  }
  static async scrapeSubreddit(subreddit){
    subreddit = typeof subreddit === "string" && subreddit.length !== 0 ? subreddit : "puppies";
    const { body } = await snek.get(`https://imgur.com/r/${subreddit}/hot.json`);
    if(!body.data) return undefined;
    const img = body.data[Math.floor(Math.random() * body.data.length)];
    return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
  }
  static promisify(fn){
  	if(nodeVersion >= 8) return require('util').promisify(fn);
  	let name = fn.name;
	  name = (name || '').replace(/\s|bound(?!$)/g, '');
	  function newFunction(...args) {
		const arg = [];
		for (const key of Object.keys(args)) arg.push(args[key]);
		return new Promise((resolve, reject) =>
			fn.apply(this, [...args, (err, res) => {
				if (err) return reject(err);
				return resolve(res);
			}]));
	  }
	Object.defineProperty(newFunction, 'name', { value: name });
	return newFunction;
  }
  static promisifyAll(obj, suffix = 'Async'){
  	const newObj = Object.getPrototypeOf(obj);
	  for (const key of Object.keys(obj).concat(Object.keys(newObj))) {
		if (typeof obj[key] !== 'function') continue;
		obj[`${key}${suffix}`] = this.promisify(obj[key]);
	}
	return obj;
  }
  
  	static wrapText(ctx, text, maxWidth) {
		return new Promise(resolve => {
			if (ctx.measureText(text).width < maxWidth) return resolve([text]);
			const words = text.split(' ');
			const lines = [];
			let line = '';
			while (words.length > 0) {
				let split = false;
				while (ctx.measureText(words[0]).width >= maxWidth) {
					const temp = words[0];
					words[0] = temp.slice(0, -1);
					if (split) {
						words[1] = `${temp.slice(-1)}${words[1]}`;
					} else {
						split = true;
						words.splice(1, 0, temp.slice(-1));
					}
				}
				if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
					line += `${words.shift()} `;
				} else {
					lines.push(line.trim());
					line = '';
				}
				if (words.length === 0) lines.push(line.trim());
			}
			return resolve(lines);
		});
	}
  
  static toPlural (str){
    let arr = str.toLowerCase().split('');
    arr[0] = arr[0].toUpperCase();
      return arr.join('');
  }
  
}


module.exports = Util;
