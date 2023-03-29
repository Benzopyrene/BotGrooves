const fs = require('fs');
const botInfo = require('../../../botInfo.json');

const subcommandCooldown = new Set();

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

                    if (subcommandCooldown.has(interaction.user.id)) {
                        await interaction.reply({
                            content: `You are on cooldown! Please wait ${(subcommandToRun.cooldown / 1000) || (botInfo.defaultCooldown / 1000)}s before using this command again`,
                            ephemeral: true
                        })
                    } else {
                        await subcommandToRun.execute(interaction, options); // Does the subcommand code
                        subcommandCooldown.add(interaction.user.id);
                        setTimeout(() => {
                            subcommandCooldown.delete(interaction.user.id)
                        }, subcommandToRun.cooldown || botInfo.defaultCooldown)
                    }




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