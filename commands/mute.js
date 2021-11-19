const Discord = require('discord.js');
const { Permissions, Client, Intents } = require ('discord.js');
const client = new Discord.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES],
	partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'mute',
  	category: 'moderation',
	description: 'Mutes a user',
	usage: '[user] [reason]',
	async execute(message, args) {

	let user = message.mentions.members.first() || message.guild.members.fetch(args[0]);
	if(!user) return message.channel.send("Couldn't find user.");

  	let reason = args.slice(1).join(" ");
	if(!reason) reason = "No reason provided.";

	if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send(`Nice try ${message.author.username}, but you do not have permission to mute someone.`);

	let mrole = message.guild.roles.cache.get("675557383954759690");
	if(!mrole) return message.channel.send("You have not specified a mute role.");

	if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	let muteEmbed = new Discord.MessageEmbed()
	.setTitle(`Muted User`)
	.setColor("#ff4f00")
	.setTimestamp()
	.setDescription(stripIndents`**Muted User:** ${user.displayName}
	**ID:** ${user.ID}
	**Reason:** ${reason}
	**Muted By:** ${message.author.username}`);

	let channel = message.guild.channels.cache.get("632769031199522826");
	if(!channel) return message.channel.send("Couldn't find logs channel.");

	const roles = user.roles.cache.filter(r => r.id !== message.guild.id)

		try {
			await user.roles.remove(roles);
			await user.roles.add("675557383954759690");
			await channel.send({ embeds: [muteEmbed] });
		} catch(e) {
			console.error(e);
		}

	setTimeout(() => {
		user.roles.remove("675557383954759690");
		user.roles.set(roles);
	}, 86400000);

}
};
