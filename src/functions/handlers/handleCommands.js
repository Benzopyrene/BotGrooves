const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() => { // Defines the new function we call in index.js
        const commandsFolders = fs.readdirSync(`./src/commands`); // Finds the contents of the src/commands/ directory
        for (const folder of commandsFolders) { // Loops through the src/commands/ directory to find the folders
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js')); // Reads the contents of that folder

            for (const file of commandFiles) { // For each file it finds (in each sub-folder)...
                const filePath = fs.readdirSync(`./src/commands/${folder}`);
                const command = require(`../../commands/${folder}/${file}`);

                // Set a new item in the Collection with the key as the command name and the value as the exported module
	            if ('data' in command && 'execute' in command) {
		            client.commands.set(command.data.name, command);

	            } else {
		            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	            }
            }
        }
    }
}