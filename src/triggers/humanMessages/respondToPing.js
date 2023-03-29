const { clientId } = require(`../../../config.json`)

module.exports = {
	name: 'respondToPing',
	isHuman: true,
	execute: async (message, client) => {

		if (message.content == `<@${clientId}>`) {

            message.reply({
                content: `Hey <@${message.author.id}>!`,
                embeds: [{
                    color: client.color,
                    title: `BotGrooves`,
                    description: `The custom bot for the ZackGrooves Discord server! \nUse \`/help\` to get started!`,
                    timestamp: new Date().toISOString(),
                    thumbnail: {
                        url: client.user.avatarURL(),
                    },
                }]
            })
		}
    }
}