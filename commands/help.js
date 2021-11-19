const Discord = require('discord.js');
const { Client, Intents } = require ('discord.js');
const client = new Discord.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES],
	partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const { stripIndents } = require("common-tags");
const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Displays a list of commands.',
  	aliases: ['commands'],
	execute(message, args) {

  const data = [];
  const { commands } = message.client;

    try {

    if(!args.length) {

    let helpEmbed = new Discord.MessageEmbed()
    .setTitle('Bee Bot Commands')
    .setDescription('**Info:**    `help`, `serverinfo`, `warnings`, `userinfo`\n**Moderation:**    `approve`, `ban`, `deny`, `jail`, `kick`, `mute`, `tempmute`, `warn`, `removewarn`, `purge`\n**Utilities:**    `confess`, `poll`, `qotd`, `report`, `suggest`\n**Fun:**    `8ball`, `coinflip`, `kill`, `marco`')
    .setFooter(`Use ${prefix}help [command name] for information about a specific command.`)
    .setColor('#ffff00');

    message.channel.send({ embeds: [helpEmbed] });
      }

    else if(args[0])  {

    const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    data.push(`**Name:** ${command.name}`);

      if (!command.name) {
	return message.reply('That is not a valid command.  Are you using an alias?');
		}

   	if (command.description) description = (`**Description:** ${command.description}`);
		else if (!command.description) description = (`**Description** No description available`);
		if (command.usage) usage = (`**Usage:** ${prefix}${command.name} ${command.usage}`);
			else if (!command.usage) usage = (`**Usage:** No usage information available`);
    	if (command.aliases) aliases = (`**Aliases:** ${command.aliases.join(', ')}`);
			else if(!command.aliases) aliases = (`**Aliases:** None`);

let msg = `**Name:** ${command.name}\n${description}\n${usage}\n${aliases}`;
message.channel.send(msg);
}
    }
    catch(e) {
      console.log(e);
    }
  }
  };
