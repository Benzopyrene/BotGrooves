module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		if (message.author.bot) return; // Human only

		client.handleTriggers(message, true)
	}
}