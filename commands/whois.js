const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../functions.js");

module.exports = {
	name: 'whois',
  	category: 'info',
	description: 'Gets information about a user',
	usage: '[user]',
  	aliases: ['userinfo'],
	async execute(message, args) {

 function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

  const member = getMember(message, args.join(" "));

  const roles = member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || 'none';


  let embed = new Discord.MessageEmbed()
	.setAuthor(`${member.user.tag}`, member.user.avatarURL())
  	.setColor("#ffff00")
	.setDescription(stripIndents `**Display Name:** ${member.displayName}
	**ID:** ${member.id}
  	**Account Created:** ${member.user.createdAt.toUTCString().substr(0, 16)}
	**Joined ${message.guild.name}:** ${member.joinedAt.toUTCString().substr(0, 16)}
	**Roles:** ${roles}`)

 try {
    await message.channel.send({ embeds: [embed] });
  } catch(e) {
    console.error(e);
  }
  }
};
