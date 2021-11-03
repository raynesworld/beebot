const Discord = require ('discord.js');
const { Client, Intents } = require ('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES],
	partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const { stripIndents } = require('common-tags');
const fs = require('fs');
const ms = require('ms');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
this.channels = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
			client.commands.set(command.name, command);
}

const blacklist = ["[BAD WORDS]"]

client.on('ready', async () => {
    console.log('Ready!');
		client.user.setActivity("for !help", { type: "WATCHING"});
});

client.on('messageCreate', message => {

if(message.author.bot) return;

if(message.content.startsWith(prefix)) {

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

 	if(!command) return;
	if(!args) return;

try {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('There was an error trying to execute that command.');
}

 } else if(!message.content.startsWith(prefix)) {

  //Dating Channels React

 if(message.channel.id === "619965922903326742" || message.channel.id === "619965965068795904") {
    try {
    message.react('❤️').then(() => message.react('💔'));
  } catch(e) {
    console.log(e);
  };
 }; //Close dating channels react

 //Blacklist Words
for (i = 0; i < blacklist.length; i++) {
          if (message.content.toLowerCase().includes(blacklist[i])) {
try {
	message.delete();
	} catch (e) {
		console.log(e);
	};
	}};
 }; //Close else if
}); // Close message listener

//Cache New Members and give then "No Roles" Role
client.on('guildMemberAdd', (member) => {
  client.users.fetch(member.id, true);
	var role = member.guild.roles.cache.get('895505308187766785')
	member.roles.add(role);
});

// Remove "No Roles" Role if they get Gender Role
client.on("guildMemberUpdate", (oldMember, newMember) => {
    if (newMember.roles.cache.some(role => role.name === "Female") || newMember.roles.cache.some(role => role.name === "Male")
		|| newMember.roles.cache.some(role => role.name === "They/Them") ) {
        newMember.roles.remove("895505308187766785");
    }
});

//Send Welcome Message
client.on("guildMemberAdd", (member) => {

	client.users.fetch(member.id, true);

	var welcomes = [
		`A wild **${member.displayName}** has appeared!`,
		`**${member.displayName}** just joined the party.`,
		`Everyone welcome **${member.displayName}**!`,
		`**${member.displayName}** just slid into the server.`,
		`Good to see you, **${member.displayName}**.`,
		`**${member.displayName}** has arrived.`,
		`Welcome, **${member.displayName}**. Pull up a seat.`,
		`We've been expecting you, **${member.displayName}**`,
		`Did **${member.displayName}** just enter without knocking?`,
		`Houston, we have a problem. **${member.displayName}** just joined.`,
		`Roses are red. Violets are blue. **${member.displayName}** has joined the server with you.`,
		`Keep it in your pants, everyone. **${member.displayName}** just joined.`
	];

var welcomemessage = Math.floor(Math.random() * welcomes.length);

const welcomeEmbed = new Discord.MessageEmbed()
.setDescription(welcomes[welcomemessage])
.setColor("#ffff00");

try {
	client.channels.cache.get("606901598635163708").send({ embeds: [welcomeEmbed] });
} catch(error){
	console.log("[ERROR]",error)}
});


//Send Goodbye Message
client.on('guildMemberRemove', (member) => {

client.users.fetch(member.id, true);

  var goodbyes = [
	`Press F to pay respects to **${member.displayName}**.`,
	`The wild **${member.displayName}** used teleport.`,
	`Why did you set me on fire, **${member.displayName}**? Why didn\'t you just write your essay?`,
	`Ouch, **${member.displayName}** let the door hit them on the way out.`,
	`Farewell, **${member.displayName}**.`,
	`So long, **${member.displayName}**, and thanks for all the fish.`,
	`**${member.displayName}** lost the game.`,
	`**${member.displayName}** has bailed on us.`,
  	`**${member.displayName}** vanished in a puff of smoke.`,
 	 `**${member.displayName}** disappeared without a trace.`,
	`**${member.displayName}** was chewed up and spit out.`,
	`**${member.displayName}** is outta here.`,
 	 `Adieu, Adieu, to you and you and **${member.displayName}**.`,
 	 `Way to go, guys. You bullied **${member.displayName}** out of the server.`,
	`In the words of Fall Out Boy, thanks for the memories, **${member.displayName}**.`,
	`**${member.displayName}** went MIA.`,
  	`**${member.displayName}** couldn\'t hang.`,
	`What will we do without **${member.displayName}**?`,
	`**${member.displayName}** was not the impostor. One impostor remains.`,
	`**${member.displayName}** has abandoned me...just like my father.`,
	`Ding, Dong! The **${member.displayName}** is dead!`];

	var goodbyemessage = Math.floor(Math.random() * goodbyes.length);

	const goodbyeEmbed = new Discord.MessageEmbed()
	.setDescription(goodbyes[goodbyemessage])
	.setColor("#FF0000");

try {
	client.channels.cache.get("606901598635163708").send({ embeds: [goodbyeEmbed] });
} catch(error){
	console.log("[ERROR]",error)}
});


client.login(config.token);
