const { REST, Routes, } = require('discord.js');
const { clientId, guildId, token } = require('../../config.json');

const rest = new REST({ version: '10' }).setToken(token);

// ...
const commandID = ''; // <--- COMMAND ID GOES HERE

// Guild Commands
rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandID))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);

// // Global Commands
// rest.delete(Routes.applicationCommand(clientId, commandID))
// 	.then(() => console.log('Successfully deleted application (Global) command'))
// 	.catch(console.error);

// node delete-commands.js