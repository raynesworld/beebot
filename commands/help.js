const Discord = require('discord.js');
const client = require('discord.js');
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
    .setDescription('**Moderation:**    `ban`, `jail`, `kick`, `mute`, `warn`, `removewarn`, `purge`\n**Info:**    `help`, `serverinfo`, `warnings`, `userinfo`\n**Utilities:**    `confess`, `report`, `suggest`\n**Fun:**    `8ball`, `coinflip`, `kill`, `marco`')
    .setFooter('Use !help [command name] for information about a specific command.')
    .setColor('#ffff00');

    message.channel.send(helpEmbed);
      }

    else if(args[0])  {

    const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    data.push(`**Name:** ${command.name}`);

      if (!command.name) {
			return message.reply('That is not a valid command.  Are you using an alias?');
		}

   	if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);

		message.channel.send(data, { split: true });

}
    }
    catch(e) {
      console.log(e);
    }
  }
  };
