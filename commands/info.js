const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'info',
  category: 'info',
	description: 'Displays server info.',
	aliases: ['serverinfo'],
	execute(message, args) {

	function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

	let embed = new Discord.MessageEmbed()
	.setTitle("Server Info")
	.setThumbnail(message.guild.iconURL())
	.setDescription(stripIndents`**Server Name:** ${message.guild.name}
	**Owned By:** ${message.guild.owner}
	**Member Count:** ${message.guild.memberCount}
  **Date Created:** ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`);

	try {
	message.channel.send(embed);
  } catch(error) {
    console.log(error);
  }
	},
};
