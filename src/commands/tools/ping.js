const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Sends Pong!'),


	async execute(interaction) {
		const wsPing = interaction.client.ws.ping;
		const sent = await interaction.reply({ content: `**Pong!** \nAPI latency: ${wsPing}ms \nTotal latency: *calculating...*`, fetchReply: true });
		interaction.editReply(`**Pong!** \nAPI latency: ${wsPing}ms \nTotal latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};