const { clientId } = require(`../../../config.json`)

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		if (!message.author.bot || message.author.id == clientId) return; // Bot messages (excluding itself) only

		client.handleTriggers(message, false);
	}
};