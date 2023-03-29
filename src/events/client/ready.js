const { ActivityType } = require('discord.js');
const { host } = require('../../../config.json')
const chalk = require("chalk");

// When the client is ready, run this code (only once)
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setStatus('online');
		client.user.setActivity('/help | https://youtube.com/@ZackGrooves', { type: ActivityType['Playing'] });

		console.log(chalk.bgGreenBright.bold(` ${client.user.tag} is online and ready! (Host: ${host}) `));
	}
}; 