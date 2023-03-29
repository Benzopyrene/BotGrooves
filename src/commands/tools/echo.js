const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder() 
	.setName('echo')
	.setDescription('Makes the bot say something')
	.addStringOption(option =>
		option.setName('message')
			.setDescription('The message to echo back')
            .setRequired(true)
            .setMaxLength(2000))

    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('The channel to echo into - Cannot be ephemeral in a different channel')
            .addChannelTypes(ChannelType.GuildText))

    .addBooleanOption(option =>
        option.setName('ephemeral')
            .setDescription('Whether or not the echo should be ephemeral (Default is false)')),
    
    async execute(interaction) {
        const message = interaction.options.getString('message');
        const channel = interaction.options.getChannel('channel') ?? interaction.channel;
        const ephemeral = interaction.options.getBoolean('ephemeral') ?? false;

        if (interaction.channel != channel) { // Different Channel
            await interaction.reply({
                content: 'Sent!',
                ephemeral: true
            })

            await channel.send({
                content: message,
                channel: channel
            })

        } else { // Same Channel Reply
            await interaction.reply({
                content: message,
                ephemeral: ephemeral
            })
        }
    }
};