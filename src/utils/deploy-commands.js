const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../../config.json');
const fs = require('fs');

const commands = [];

let commandFiles
let commandsFolders

const guildCommand = true; // Toggle to prevent dev commands going global

if (guildId == '1090678203334529075' && guildCommand) { // Dev server (deliberately hardcoded)
	commandsFolders = fs.readdirSync(`./src/commands`); // All command folders & files
} else { // Every other server
	commandsFolders = fs.readdirSync(`./src/commands`).filter(folder => !folder.match('!dev')); // Only the non-dev files get refreshed
}

for (const folder of commandsFolders) {
	commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const command = require(`../../src/commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
	}
}




// Construct and prepare an instance of the REST module (idk tbh thats what the guide said)
const rest = new REST({ version: '10' }).setToken(token);

// Deploying commands
(async () => {
	try {
		if (guildCommand) {
			console.log(`Started refreshing ${commands.length} guild application (/) commands.`);

			// Use the put method to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(clientId, guildId), // Guild Commands
				{ body: commands },
			);
	
			console.log(`Successfully reloaded ${data.length} guild application (/) commands.`);
		} else {
			console.log(`Started refreshing ${commands.length} global application (/) commands.`);

			// Use the put method to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationCommands(clientId), // Global Commands
				{ body: commands },
			);
	
			console.log(`Successfully reloaded ${data.length} global application (/) commands.`);
		}
	} catch (error) {
		console.error(error);
	}
})();


// node deploy-commands.js
