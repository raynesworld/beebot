const Discord = require('discord.js');
const { Permissions, Client, Intents } = require ('discord.js');
const client = new Discord.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES],
	partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

module.exports = {
	name: 'approve',
	description: 'Marks a suggestion as approved using its ID.',
	usage: '[ID]',
	async execute(message, args) {

if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send('Only moderators can do this.');
const messageID = args[0];
if (!messageID) return message.reply('No message ID specified.');

try {
const suggestionChannel = message.guild.channels.cache.get('626182917953028123');
const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
const data = suggestedEmbed.embeds[0];

const approvedEmbed = new Discord.MessageEmbed()
.setTitle('Suggestion Approved')
.setDescription(data.description)
.setColor('GREEN')
.setFooter(data.footer.text + ' | Approved by ' + message.author.username)
.setTimestamp(data.Timestamp);

message.delete({timeout: 1000});
await suggestedEmbed.edit({ embeds: [approvedEmbed] });
await suggestedEmbed.reactions.removeAll();

} catch(err) {
	console.log(err);
}
	},
};
