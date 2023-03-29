const botInfo = require('../../../botInfo.json');

module.exports = (client) => {
    client.noInteractionNameFound = async (type, interaction, subPropertyName) => {
        const errorChannel = interaction.client.channels.cache.get(botInfo.channelIds.errorChannel); // Error reports get sent here
        let interactionErrorType

        // Add to this if a new interaction type is coded
        if (type == 'command') interactionErrorType = `/${interaction.commandName}`;  
        else if (type == 'subcommand') interactionErrorType = `/${interaction.commandName} ${subPropertyName}`;
        else if (type == 'autocomplete') interactionErrorType = `/${interaction.commandName}`;
        else if (type == 'button') interactionErrorType = interaction.customId;


        // Usual error stuff from before making this function:
        console.error(`No ${type} matching '${interactionErrorType}' was found.`);
        if (type !== 'autocomplete') {
            await interaction.reply({
                content: `No ${type} matching \`${interactionErrorType}\` was found.`,
                ephemeral: true,
            })
        }

        if (!botInfo.devIds.includes(interaction.member.id)) {
            await errorChannel.send({
                embeds: [{
                    color: 0xed616f,
                    title: `__No ${type}__ matching the name '\`${interactionErrorType}\`' was found!`,
                    description: `${interaction.user.tag} (${interaction.member.id}) tried to use the \`${interactionErrorType}\` **${type}**`,
                    timestamp: new Date().toISOString()
                }]
            })
        }
    }
}