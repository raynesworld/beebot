const Discord = require ('discord.js');
const { Permissions, Client, Intents } = require ('discord.js');
const client = new Discord.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES],
	partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

const fs = require("fs");
const { stripIndents } = require("common-tags");

const warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
	name: 'warn',
  category: 'moderation',
	description: 'Issues a warning to a user.',
	usage: '[username] [reason]',
	async execute(message, args) {

try {

if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("You do not have permission to warn someone.");
let user = message.mentions.members.first() || message.guild.members.cache.fetch(args[0]);
if(!user) return message.channel.send("Can't find user.");

if(message.mentions.users.id === '301212599381393409') return message.channel.send("Nice try.");
if(user.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send('You cannot warn another moderator.');
if(user.id === message.author.id) return message.channel.send('You cannot warn yourself.');

let reason = args.slice(1).join(" ");
if(!reason) return message.channel.send("Please provide a reason for warning this user.");
//	let warnlevel = warnings[user.id].warnings;

if(!warnings[user.id]) warnings[user.id] = {
		warnings: 0
		};

	warnings[user.id].warnings++;

	await fs.writeFile("./warnings.json", JSON.stringify(warnings, null, 4), (err) => {
		if (err) console.log(err);
	});

	let warnEmbed = new Discord.MessageEmbed()
	.setTitle("Warning Issued")
	.setColor("#ffff00")
	.setTimestamp()
	.setDescription(stripIndents`**Warned User:** ${user.displayName}
	**ID:** ${user.id}
	**Reason:** ${reason}
	**Warnings:** ${warnings[user.id].warnings}
	**Warned By:** ${message.author.username}`);

	let logs = message.guild.channels.cache.get("632769031199522826");
	if(!logs) return message.channel.send("Couldn't find logs channel.");

	await message.delete({timeout: 1000});
	await logs.send({ embeds: [warnEmbed] });
	await user.send(`You have received a warning in ${message.guild.name} for ${reason}. Your number of warnings is now ${warnings[user.id].warnings}.`);
	} catch (error) {
	console.log(error);
}
}
};
