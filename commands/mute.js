const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'mute',
  category: 'moderation',
	description: 'Mutes a user',
	usage: '[user, reason]',
	async execute(message, args) {

	let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!user) return message.channel.send("Couldn't find user.");

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided.";

	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`Nice try ${message.author.username}, but you do not have permission to mute someone.`);

	let mrole = message.guild.roles.cache.get("675557383954759690");

  if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	let muteEmbed = new Discord.MessageEmbed()
	.setTitle(`Muted User`)
	.setColor("#ff4f00")
	.setTimestamp()
	.setDescription(stripIndents`**Muted User:** ${user}
	**Reason:** ${reason}
	**Muted By:** ${message.author.username}`);

	let channel = message.guild.channels.cache.find(channel => channel.name === "logs");
	if(!channel) return message.channel.send("Couldn't find logs channel.");

		try {
			await user.roles.remove(user.roles)
			await user.role.add('675557383954759690')
			await channel.send(muteEmbed);
		} catch(e) {
			console.error(e);
		}

	setTimeout(() => {
		user.role.remove('675557383954759690');
	}, 86400000);

}
};
