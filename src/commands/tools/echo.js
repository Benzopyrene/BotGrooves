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

    .addBooleanOption(option =>
        option.setName('reply')
            .setDescription('Whether or not the echo should reply to your command (Default is true)'))

    .addBooleanOption(option =>
        option.setName('ephemeral')
            .setDescription('Whether or not the echo should be ephemeral (Default is false)')),
    
    async execute(interaction) {
        const message = interaction.options.getString('message');
        const replyType = interaction.options.getBoolean('reply') ?? true;
        const ephemeral = interaction.options.getBoolean('ephemeral') ?? false;

        if (replyType) {
            await interaction.reply({
                content: message,
                ephemeral: ephemeral
            });
        } else if (!replyType) {
            await interaction.reply({
                content: ':eyes:',
                ephemeral: true
            })
            await interaction.channel.send({
                content: message
            });
        }
    }
};