const botInfo = require('../../../botInfo.json');

module.exports = (client) => {
    client.errorWithCodeResponse = async (type, error, interaction, subPropertyName) => {
        const errorChannel = interaction.client.channels.cache.get(botInfo.channelIds.errorChannel); // Error reports get sent here
        let interactionErrorType

        // Add to this if a new interaction type is coded
        if (type == 'command') interactionErrorType = `/${interaction.commandName}`;  
        else if (type == 'subcommand') interactionErrorType = `/${interaction.commandName} ${subPropertyName}`;
        else if (type == 'autocomplete') interactionErrorType = `/${interaction.commandName}`;
        else if (type == 'button') interactionErrorType = interaction.customId;


        // Usual error stuff before making this function:
        console.error(`Error executing '${interactionErrorType}' ${type}: \n${error}`);
        let _msg = `:warning: **ERROR WITH ${type.toUpperCase()}!** :warning:`

        // Checks for dev use error (and immediately shows error details)
        if (botInfo.devIds.includes(interaction.member.id) && type !== 'autocomplete') { // you can't reply to an autocomplete thing because nothing has been sent
            _msg += `\n\nError Details:\n\`${error}\``;
            await interaction.reply({ 
                content: _msg, 
                ephemeral: true 
            });
        } else if (type !== 'autocomplete') { // Public use error
            _msg += `\nPLEASE CONTACT THE DEVELOPER (Benzopyrene#0334)`;
            await interaction.reply({ 
                content: _msg, 
                ephemeral: true 
            });

            
            await errorChannel.send({
                embeds: [{
                    color: 0xed616f,
                    title: `__Code error__ occurred!`,
                    description: `${interaction.user.tag} (${interaction.member.id}) tried to use the \`${interactionErrorType}\` **${type}**! \n\`\`\`${error}\`\`\``,
                    timestamp: new Date().toISOString()
                }]
            })
        } else { // Basically just sends this error if it is an autocomplete error
            await errorChannel.send({
                embeds: [{
                    color: 0xed616f,
                    title: `__Code error__ occurred!`,
                    description: `${interaction.user.tag} (${interaction.member.id}) tried to use the **autocomplete** feature in \`${interactionErrorType}\`! \n\`\`\`${error}\`\`\``,
                    timestamp: new Date().toISOString()
                }]
            })
        }
    }
}