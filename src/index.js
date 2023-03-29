// Most of the initial setup is from the discord.js guide lol
const fs = require('fs');

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, databaseToken } = require('../config.json');
const chalk = require('chalk');

// Create a new client instance
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.DirectMessages,
	], 
});

client.commands = new Collection();
client.buttons = new Collection();
client.stringSelectMenus = new Collection();
client.triggers = new Collection();
client.data = new Collection(); // Set of Global Variables
client.color = 0xFE7474 // For embeds




// FUNCTIONS (eg. event and command handlers) - this is so we can do client.insertFunctionNameHere() to save time
const functionFolders = fs.readdirSync(`./src/functions`); // Get all the folders in the /src/functions directory
for (const folder of functionFolders) { // Loop through the folders...
	const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js')); // ...to get the function files

	for (const file of functionFiles) { // For each file it finds...
		require(`./functions/${folder}/${file}`)(client); // ...it passes in (client), so we can do things like client.commands.set etc (see the command handler for an example)
	}
}

client.handleEvents(); // Call the function we defined in the handleEvents file
client.handleCommands(); // Call the function we defined in the handleCommands file
client.handleComponents();

// Login to Discord with your client's token
client.login(token).then(console.log(chalk.yellowBright("Client has logged in...")));