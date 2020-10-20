const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'poll',
	description: 'Creates a poll with thumbs up or thumbs down reactions.',
	usage: '[question]',
	async execute(message, args) {

  let question = args.join(" ");
  if(!question) return;

	let embed = new Discord.MessageEmbed()
	.setTitle(`Question for The Hive:`)
	.setDescription(question)
	.setColor("#ffff00")
  .setFooter(`Asked by ${message.author.username}`)
	.setTimestamp();

	let pollChannel = message.guild.channels.cache.get("626535081439395860");
	if(!pollChannel) return message.author.send("Can't find poll channel.");

  if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	message.delete({timeout: 1000});
	pollChannel.send(embed).then(async embedMessage => {
		await embedMessage.react('👍');
		await embedMessage.react('👎');
	});
  }

};
