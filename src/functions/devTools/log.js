const botInfo = require('../../../botInfo.json');

module.exports = (client) => {
    client.log = async(
        interaction, 
        whatHappened, // Embed title
        whoDidIt, // Top of the field
        details, // ...recieved 100 GP from bla bla
        recievingId, // User/Channel/Role id etc
        color, // Optional - Default is client.color
        content // Optional
        ) => {

        const logChannel = interaction.client.channels.cache.get(botInfo.channelIds.logsChannel);

        logChannel.send({
            embeds: [{
                title: whatHappened,
                fields: [{
                    name: whoDidIt,
                    value: details,
                    inline: true 
                }],
                footer: {
                    text: `${recievingId}  ◇ • ◇  ${new Date().toUTCString()}`
                },
                color: color || interaction.client.color,
            }],
            content: content,
        });
    }
}