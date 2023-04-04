const fs = require('fs');

module.exports = (client) => {
    client.runSubcommand = async (parentFolder, parentCommand, subcommand, interaction, options) => {

        const subcommandToRun = require(`../../commands/${parentFolder}/${parentCommand}Subcommands/${subcommand}`);

        if (subcommandToRun.name !== subcommand) {
            interaction.client.noInteractionNameFound('subcommand', interaction, subcommand);
            return;
        }


        if ('execute' in subcommandToRun) { 
            if (subcommandToRun.parentCommand == parentCommand && subcommandToRun.name == subcommand) { 
                try {
                    await subcommandToRun.execute(interaction, options); // Does the subcommand code
                } catch (error) {
                    interaction.client.errorWithCodeResponse('subcommand', error, interaction, subcommand);
                }
            }
        } else {
            const filePath = fs.readdirSync(`./src/commands/${parentFolder}/${parentCommand}Subcommands`);
            console.log(`[WARNING] The subcommand at ${filePath} is missing a required "execute" property.`);
        }
    }
}