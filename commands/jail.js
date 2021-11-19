const Discord = require('discord.js');
const Permissions = require ('discord.js');
const ms = require("parse-ms");
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'jail',
  	category: 'moderation',
	description: 'Removes all roles from a user except the restricted prisoner role',
	usage: '[user] [reason]',
	async execute(message, args) {

	let user = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
	if(!user) return message.channel.send("Couldn't find user.");

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided.";

  if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send(`Nice try ${message.author.username}, but you do not have permission to jail someone.`);
  if(user.permissions.has(Permissions.KICK_MEMBERS)) return message.channel.send('That user is too powerful.');

  if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	let jailEmbed = new Discord.MessageEmbed()
	.setTitle(`Jailed User`)
	.setColor("#bc0000")
	.setTimestamp()
	.setDescription(stripIndents`**Jailed User:** ${user.displayName}
	**ID:** ${user.id}
	**Reason:** ${reason}
	**Jailed By:** ${message.author.username}`);

	const logs = message.guild.channels.cache.get("632769031199522826");
	if(!logs) return message.channel.send("Couldn't find logs channel.");

	const roles = user.roles.cache.filter(r => r.id !== message.guild.id)

		try {
			await user.roles.remove(roles)
			await user.roles.add('629180728306827264')
			await logs.send({ embeds: [jailEmbed] })
			await message.delete({timeout: 1000});
		} catch(e) {
			console.error(e);
		}

	setTimeout(() => {
		user.roles.remove('629180728306827264')
		user.roles.set(roles);
	}, 86400000);
}
};
