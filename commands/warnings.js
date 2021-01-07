const Discord = require("discord.js");
const fs = require("fs");
let warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
	name: 'warnings',
  category: 'moderation',
	description: 'Checks how many warnings a user has.',
	usage: '[username]',
  aliases: ['warns'],
	async execute(message, args) {

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
  if(!args[0]) user = message.author;
	let warnLevel = warnings[user.id] ? warnings[user.id].warnings : 0;
	if(!warnLevel) return message.channel.send(`${user.displayName} has 0 warnings.`);


	if(!warnings[user.id]) return message.channel.send(`${user.displayName} has 0 warnings.`);
	if(warnLevel === undefined) return message.channel.send(`${user.displayName} has 0 warnings.`);
	if(user === undefined) return message.channel.send(`${user.displayName} has 0 warnings.`);
	if(warnings[user.id].warnings === undefined) return message.channel.send(`${user.displayName} has 0 warnings.`);


try {
  message.channel.send(`${user.displayName} has ${warnLevel} warning(s).`);
} catch(error) {
	message.channel.send(`${user.displayName} has 0 warnings.`);
}
}
};
