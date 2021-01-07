const Discord = require("discord.js");
const ms = require("parse-ms");
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'jail',
  	category: 'moderation',
	description: 'Removes all roles from a user except the restricted prisoner role',
	usage: '[user, reason]',
	async execute(message, args) {

	let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
	if(!user) return message.channel.send("Couldn't find user.");

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided.";

	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`Nice try ${message.author.username}, but you do not have permission to jail someone.`);

	if(user.hasPermission("MANAGE_ROLES")) return message.channel.send(`${user} is too powerful.`);

  if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	let jailEmbed = new Discord.MessageEmbed()
	.setTitle(`Jailed User`)
	.setColor("#bc0000")
	.setTimestamp()
	.setDescription(stripIndents`**Jailed User:** ${user}
	**Reason:** ${reason}
	**Jailed By:** ${message.author.username}`);

	let logs = message.guild.channels.cache.get("632769031199522826");
	if(!logs) return message.channel.send("Couldn't find logs channel.");

	const roles = user.roles.cache.filter(r => r.id !== message.guild.id)

		try {
			await user.roles.remove(roles)
			await user.roles.add('629180728306827264')
			await logs.send(jailEmbed)
			await message.delete({timeout: 2000});
		} catch(e) {
			console.error(e);
		}

	setTimeout(() => {
		user.roles.remove('629180728306827264')
		user.roles.set(roles);
	}, 86400000);
}
};
