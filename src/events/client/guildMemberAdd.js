module.exports = {
	name: 'guildMemberAdd',
	execute: async(member, client) => {

		if (member.guild.id == '1090678203334529075') { // Dev server

			const welcomeChannel = client.channels.cache.get('1092194769079386272');
			console.log(member);
			welcomeChannel.send({
				content: `${member.user.username} has joined the vibe`
			}); // member.user.id   member.user._roles   member.user.bot
		}
	},
};
