module.exports = {
	name: 'guildMemberAdd',
	execute: async(member, client) => {

		if (member.guild.id == '1007959559400325210') { // Dev server
			console.log('A new member has joined the server!');

		}
	},
};
