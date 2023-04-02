module.exports = {
	name: 'guildMemberAdd',
	execute: async(member, client) => {

		if (member.guild.id == '838606384895492096') { // Main server

			// const welcomeChannel = client.channels.cache.get('838631101698015252'); // Currently #welcome

			// // Welcome message
			// await welcomeChannel.send({
			// 	content: `${member.user.username} has joined the vibe`
			// }); 

			// // Welcome DM
			// member.user.send({
			// 	content: 'Welcome to the vibe my homie, enjoy your stay, and keep those booties movin\''
			// });
		}
	},
};
