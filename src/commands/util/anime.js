const kitsu = require("node-kitsu");
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, args, color) => {
  if(!args.length) return args.missing(message, 'no query provided', client.commands.get('anime').help);
  const embed = new RichEmbed();
  const result = await kitsu.searchAnime(args.join(' ').replace(/ ,/g, ' '), 0);
  if(!result.length) return message.channel.send('No result found!');
	embed.setTitle('Multiple Manga Found!');
	embed.setDescription(`${result.map((x, i) => `**${i+1}.** ${x.attributes.canonicalTitle}`).join('\n')}\n **Please enter the number of the Anime you want to view**\n**Or type** \`cancel\` **to cancel the command**`);
	embed.setColor(color);
	const messToDel = await message.channel.send(embed);
	try {
		const response = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 });
		messToDel.delete();
		if(!response.size) return undefined;
		let choice = response.first().content.toLowerCase();
		if(choice === 'cancel') return message.channel.send('Command canceled.');
		if(isNaN(choice)) return message.channel.send('This is not a valid number, please try again.');
		choice = parseInt(choice, 10) -1;
		const atts = result[choice].attributes;
		embed.setTitle(atts.canonicalTitle);
    embed.setURL(`https://kitsu.io/anime/${result[choice].id}`)
		embed.setDescription(atts.synopsis)
		if (atts.posterImage) embed.setThumbnail(atts.posterImage.medium);
		if (atts.coverImage) embed.setImage(atts.coverImage.large);
		if (atts.titles.en) embed.addField("English title", atts.titles.en, true);
		if(atts.titles.ja_jp) embed.addField("Japanese Title", atts.titles.ja_jp, true);
		if(atts.abbreviatedTitles && atts.abbreviatedTitles.length > 0) embed.addField("Synonyms", atts.abbreviatedTitles, true);
		if(atts.episodeCount && atts.episodeLength) embed.addField("Episodes", atts.episodeCount + " @ " + atts.episodeLength + " minutes", true);
		else if(atts.episodeCount) embed.addField("Episodes", atts.episodeCount, true)
		embed.addField("Type", atts.showType, true);
		embed.addField("Status", client.util.toPlural(atts.status), true);
		if(atts.ageRating) embed.addField("Age Restrictions", atts.ageRating + " " + atts.ageRatingGuide, true);
		embed.addField("Popularity Rank", "#"+atts.popularityRank, true);
		if(atts.averageRating){
			embed.addField("Rating Rank", "#"+atts.ratingRank, true);
			embed.addField("Rating", atts.averageRating, true);
		}
      // embed.addField("External Link", `[${atts.canonicalTitle}]()`, true)
		if(atts.startDate && atts.endDate) embed.setFooter(atts.startDate + " to " + atts.endDate)
		else if(atts.startDate && !atts.endDate) embed.setFooter(atts.startDate)
		else embed.setFooter(atts.tba);
		return message.channel.send(embed);
	} catch(e){
		console.error(e);
		return message.reply(e.stack, { code: 'ini' });
	}
}

exports.conf = {
  aliases: [],
  cooldown: '10'
}

exports.help = {
	name: 'anime',
	description: 'show anime list from kitsu.io',
  usage: 'anime <query>', 
	example: ['anime violet evergarden'] 
}