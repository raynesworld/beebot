module.exports = {
	name: 'purge',
  category: 'moderation',
	description: 'Purge up to 99 messages.',
  usage: '[10]',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		//If user cannot delete messages
		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.reply('You do not have permission to purge messages.');
		}

		//If args[0] is not a number	
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to purge messages in this channel!');
		});
	},
};
