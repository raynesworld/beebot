const Discord = require("discord.js");

module.exports = {
  name: 'qotd',
  category: 'fun',
  description: 'Bot posts a question of the day.',
  usage: '[question]',
  execute(message, args) {

  let qotd = args.join(" ");
  if(!qotd) return;

  let embed = new Discord.MessageEmbed()
  .setTitle("Question of the Day")
  .setDescription(`<@&835366836639891517>  ` + qotd)
  .setColor("#ffff00")
  .setTimestamp();

  let qotdChannel = message.client.channels.cache.get("634977506122006559");
  if(!qotdChannel) return message.reply("Question of the Day channel could not be found.");

try {
  qotdChannel.send(embed);
} catch(error) {
  console.error(error);
}
  }
}
