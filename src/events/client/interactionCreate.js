const botInfo = require('../../../botInfo.json');


module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		// Functions that were previously here are now in src/functions/tools/ and are now global

		// Command interactions
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			
			if (!command) { // No command found
				await interaction.client.noInteractionNameFound('command', interaction);
				return;
			}

			try {
				await command.execute(interaction); // Does the command code


			} catch (error) { // Error with the command
				await interaction.client.errorWithCodeResponse('command', error, interaction);
			}



		// Button interactions
		} else if (interaction.isButton()) {
			// Checks to see if this collection of buttons has the custom ID in it
			const button = interaction.client.buttons.get(interaction.customId);

			if (!button) { // No button with the id provided found
				await interaction.client.noInteractionNameFound('button', interaction)
				return;
			}

			try {
				await button.execute(interaction); // Does the button code
			} catch (error) { // Error with the button code
				await interaction.client.errorWithCodeResponse('button', error, interaction);
			}



		// Autocomplete interactions
		} else if (interaction.isAutocomplete()) {
			const command = interaction.client.commands.get(interaction.commandName);
			
			if (!command) { // No command found
				await interaction.client.noInteractionNameFound('autocomplete', interaction);
				return;
			}

			try {
				await command.autocomplete(interaction); // Does the command code
			} catch (error) { // Error with the command
				await interaction.client.errorWithCodeResponse('autocomplete', error, interaction);
			}


		
		// Select Menu interactions
		} else if (interaction.isStringSelectMenu()) { // Ugh thats annoying - I have to do one for each type of selectMenu interaction
			// Checks to see if this collection of select menus has the custom ID in it
			const selectMenu = interaction.client.selectMenus.get(interaction.customId);

			if (!selectMenu) { // No button with the id provided found
				await interaction.client.noInteractionNameFound('selectMenu', interaction)
				return;
			}

			try {
				await selectMenu.execute(interaction); // Does the button code
			} catch (error) { // Error with the button code
				await interaction.client.errorWithCodeResponse('selectMenu', error, interaction);
			}
		}
	},
};