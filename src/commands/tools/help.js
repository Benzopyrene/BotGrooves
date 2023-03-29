const { SlashCommandBuilder } = require('discord.js');
const { version, description } = require('../../../package.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('GrooveBot help - commands and info'),


	async execute(interaction) {
		const bhelpEmbed = {
            title: "GrooveBot Info and Commands",
            description: description,
            color: interaction.client.color,
            fields: [
                {
                    name: '`/help`',
                    value: 'Sends this message!'
                },
                {
                    name: '`/about`',
                    value: 'General info about BotGrooves'
                },
                {
                    name: '`/ping`',
                    value: 'Responds with \'Pong\' and latency info!'
                },
                {
                    name: '`/echo`',
                    value: 'Makes the bot say something!'
                },
            ],
            timestamp: new Date().toISOString(),
        }

        await interaction.reply({ 
            content: `<@${interaction.user.id}>`,
            embeds: [bhelpEmbed] 
        })
	},
};