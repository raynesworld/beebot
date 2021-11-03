const Discord = require('discord.js');
const Permissions = require ('discord.js');
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'ban',
	category: 'moderation',
	description: 'Bans the user from the server.',
	usage: '[user] [reason]',
	async execute(message, args) {

	let banPerson = message.mentions.members.first() || message.guild.members.fetch(args[0]);
	if(!banPerson) return message.channel.send("Can't find member.");

	let reason = args.slice(1).join(" ");
 	if(!reason) reason = "No reason provided.";

	if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send("Nice try, Pleb.");
	if(banPerson.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send("That user is too powerful to be banned by me.");

	let banEmbed = new Discord.MessageEmbed()
  	.setTitle("**User Banned**")
	.setColor("#bc0000")
  	.setTimestamp()
	.setDescription(stripIndents`**Banned User:** ${banPerson.displayName}\n(ID: ${banPerson.id})
	**Reason:** ${reason}
	**Responsible Moderator:** ${message.author.username}`);

	let logs = message.guild.channels.cache.get("632769031199522826");
	if(!logs) return message.channel.send("Couldn't find logs channel.");

  try {
	await banPerson.ban({ reason: `${reason}` });
	await logs.send({ embeds: [banEmbed] });
	await setTimeout(() => message.delete(), 1000);
  } catch (e){
  console.log(e);
  }
},
};
