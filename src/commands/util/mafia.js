/**
* Credits: dragonfire535 
* Source: https://github.com/dragonfire535/xiao/blob/master/commands/games/mafia.js
*/

const { questions, stories } = require('../../assets/json/mafia');
const { Collection } = require('discord.js');
const { shuffle, delay, awaitPlayers } = require('../../handle/util.js');

const playing = new Set();

exports.run = async(client, message, args, color, prefix) => {

		if (playing.has(message.channel.id)) return message.reply('Only one game may be occurring per channel.');
		playing.add(message.channel.id);
		try {
			await message.channel.send('You will need at least 2 more players, at maximum 10. To join, type `join game`.');
			const awaitedPlayers = await awaitPlayers(message, 10, 3, { dmCheck: true });
			if (!awaitedPlayers) {
				playing.delete(message.channel.id);
				return message.channel.send('Game could not be started...');
			}
			const players = await generatePlayers(awaitedPlayers);
			let turn = 1;
			while (players.size > 2 && players.some(p => p.role === 'mafia')) {
				let killed = null;
				let saved = null;
				await message.channel.send(`Night ${turn}, sending DMs...`);
				for (const player of players.values()) {
					if (player.role.includes('pleb')) continue;
					await message.channel.send(`The ${player.role} is making their decision...`);
					const valid = Array.from(players.filter(p => p.role !== player.role).values());
					await player.user.send(`${questions[player.role]} Please type the number.
						${valid.map((p, i) => `**${i + 1}.** ${p.user.tag}`).join('\n')}
					`);
					const filter = res => valid[Number.parseInt(res.content, 10) - 1];
					const decision = await player.user.dmChannel.awaitMessages(filter, {
						max: 1,
						time: 120000
					});
					if (!decision.size) {
						await player.user.send('Sorry, time is up!');
						continue;
					}
					const choice = valid[Number.parseInt(decision.first().content, 10) - 1].id;
					if (player.role === 'mafia') {
						const chosen = players.get(choice);
						killed = chosen.id;
						await player.user.send(`${chosen.user.tag} will be killed...`);
					} else if (player.role === 'doctor') {
						const chosen = players.get(choice);
						saved = chosen.id;
						await player.user.send(`${chosen.user.tag} will be saved...`);
					} else if (player.role === 'detective') {
						await player.user.send(players.find(p => p.role === 'mafia').id === choice ? 'Yes.' : 'No.');
					}
				}
				const display = killed ? players.get(killed).user : null;
				const story = stories[Math.floor(Math.random() * stories.length)];
				if (killed && killed === saved) {
					await message.channel.send(`Late last night, a Mafia member emerged from the dark and tried to kill ${display}${story}
						Thankfully, a doctor stepped in just in time to save the day.
						Who is this mysterious Mafia member? You have one minute to decide.
					`);
				} else if (killed && players.size < 3) {
					await message.channel.send(`Late last night, a Mafia member emerged from the dark and killed poor ${display}${story}
						Sadly, after the event, the final citizen left the town in fear, leaving the Mafia to rule forever.
					`);
					break;
				} else if (killed && killed !== saved) {
					players.delete(killed);
					await message.channel.send(`Late last night, a Mafia member emerged from the dark and killed poor ${display}${story}
						Who is this mysterious Mafia member? You have one minute to decide.
					`);
				} else {
					await message.channel.send(`Late last night, a Mafia member emerged from the dark. Thankfully, however, they didn't try to kill anyone.
						Who is this mysterious Mafia member? You have one minute to decide.
					`);
				}
				await delay(60000);
				const playersArr = Array.from(players.values());
				await message.channel.send(`Who do you think is the Mafia member? Please type the number.
					${playersArr.map((p, i) => `**${i + 1}.** ${p.user.tag}`).join('\n')}
				`);
				const voted = [];
				const filter = res => {
					if (!players.some(p => p.user.id === res.author.id)) return false;
					if (voted.includes(res.author.id)) return false;
					if (!playersArr[Number.parseInt(res.content, 10) - 1]) return false;
					voted.push(res.author.id);
					return true;
				};
				const votes = await message.channel.awaitMessages(filter, {
					max: players.size,
					time: 120000
				});
				if (!votes.size) {
					await message.channel.send('No one will be hanged.');
					continue;
				}
				const hanged = getHanged(votes, players, playersArr);
				await message.channel.send(`${hanged.user} will be hanged.`);
				players.delete(hanged.id);
				++turn;
			}
			playing.delete(message.channel.id);
			const mafia = players.find(p => p.role === 'mafia');
			if (!mafia) return message.channel.send('The Mafia has been hanged! Thanks for playing!');
			return message.channel.send(`Oh no, the Mafia wasn't caught in time... Nice job, ${mafia.user}!`);
		} catch (err) {
			playing.delete(message.channel.id);
			return message.channel.send(`Oh no, an error occurred: \`${err.stack}\`. Try again later!`);
		}
	}

	async function generatePlayers(list) {
		let roles = ['mafia', 'doctor', 'detective'];
		for (let i = 0; i < (list.length - 2); i++) roles.push(`pleb ${i + 1}`);
		roles = shuffle(roles);
		const players = new Collection();
		let i = 0;
		for (const user of list) {
			players.set(user.id, {
				id: user.id,
				user,
				role: roles[i]
			});
			await user.send(`Your role will be: ${roles[i]}!`);
			i++;
		}
		return players;
	}

	function getHanged(votes, players, playersArr) {
		const counts = new Collection();
		for (const vote of votes.values()) {
			const player = players.get(playersArr[Number.parseInt(vote.content, 10) - 1].id);
			if (counts.has(player.id)) {
				++counts.get(player.id).votes;
			} else {
				counts.set(player.id, {
					id: player.id,
					votes: 1,
					user: player.user
				});
			}
		}
		return counts.sort((a, b) => b.votes - a.votes).first();
	}
	
exports.conf = {
	aliases: ['town-of-salem', 'werewolf'],
	cooldown: '5'
	} 
	
exports.help = {
	name: 'mafia', 
	description: 'Who is the Mafia? Who is the doctor? Who is the detective? Will the Mafia kill them all?', 
	usage: 'mafia', 
	example: ['mafia'] 
	} 