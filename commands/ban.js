const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'ban',
 	category: 'moderation',
	description: 'Bans the user from the server.',
	usage: '[user] [reason]',
	async execute(message, args) {

	let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
	if(!user) return message.channel.send("Can't find user.");

	let reason = args.slice(1).join(" ");
  	if(!reason) reason = "No reason provided.";

	if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nice try, Pleb.");
	if(user.hasPermission("BAN_MEMBERS")) return message.channel.send("That user is too powerful.");

	let banEmbed = new Discord.MessageEmbed()
  	.setTitle("**User Banned**")
	.setColor("#bc0000")
  	.setTimestamp()
	.setDescription(stripIndents`**Banned User:** ${user.displayName}
	**Reason:** ${reason}
	**Responsible Moderator:** ${message.author.username}`);

	let logs = message.guild.channels.cache.find(channel => channel.name === "logs");
	if(!logs) return message.channel.send("Can't find logs channel.");

  try {
	await message.delete({ timeout: 1000 });
	await user.ban({reason});
	await logs.send(banEmbed);
  }catch (e){
  console.log(e);
  }

	},
};
