const Discord = require('discord.js');
const Permissions = require ('discord.js');
const stripIndents = require("common-tags");
const { getMember, formatDate } = require("../functions.js");

module.exports = {
	name: 'kick',
  	category: 'moderation',
	description: 'Kicks the user from the server.',
	usage: '[user] [reason]',
	async execute(message, args) {

	let kickPerson = message.mentions.members.first() || message.guild.members.fetch(args[0]);
	if(!kickPerson) return message.channel.send("Can't find user.");

	let reason = args.slice(1).join(" ");
  	if(!reason) reason = "No reason provided.";

	if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send(`Nice try ${message.author.username}, but you do not have permission to kick someone.`)
	//if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("That user can't be kicked.");

	let embed = new Discord.MessageEmbed()
	.setTitle("User Kicked")
	.setColor("#e56b00")
	.setTimestamp()
  	.setDescription(stripIndents`**Kicked User:** ${kickPerson.displayName}\n(ID: ${kickPerson.id})
	**Reason:** ${reason}
	**Responsible Moderator:** ${message.author.username}`);

	let logs = message.guild.channels.cache.get("632769031199522826");
	if(!logs) return message.channel.send("Couldn't find logs channel");

  try {
	await setTimeout(() => message.delete(), 10000);
	await kickPerson.kick(reason);
	await logs.send({ embeds: [embed] });
  } catch(e) {
    console.error(e);
  }
},
};
