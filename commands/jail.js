const Discord = require("discord.js");
const ms = require("parse-ms");
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'jail',
  category: 'moderation',
	description: 'Removes all roles from a user except the restricted prisoner role',
	usage: '[user, reason]',
	async execute(message, args) {

	let jUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
	if(!jUser) return message.channel.send("Couldn't find user.");

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided.";

	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`Nice try ${message.author.username}, but you do not have permission to jail someone.`);

	if(jUser.hasPermission("MANAGE_ROLES")) return message.channel.send(`${jUser} is too powerful.`);

  if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	let jailEmbed = new Discord.MessageEmbed()
	.setTitle(`Jailed User`)
	.setColor("#bc0000")
	.setTimestamp()
	.setDescription(stripIndents`**Jailed User:** ${jUser}
	**Reason:** ${reason}
	**Jailed By:** ${message.author.username}`);

	let jailchannel = message.guild.channels.cache.get("632769031199522826");
	if(!jailchannel) return message.channel.send("Couldn't find logs channel.");

	const roles = jUser.roles.cache.filter(r => r.id !== message.guild.id)

		try {
			await jUser.roles.remove(roles)
			await jUser.roles.add('629180728306827264')
			await jailchannel.send(jailEmbed)
			await message.delete({timeout: 2000});
		} catch(e) {
			console.error(e);
		}

	setTimeout(() => {
		jUser.roles.remove('629180728306827264')
		jUser.roles.set(roles);
	}, 86400000);
}
};
