const chalk = require('chalk');
const { channelIds } = require('../../../botInfo.json');

module.exports = {
    name: 'error',
    execute: (error, client) => {
        console.log(chalk.red(`▤ Database Error: \n${error}`))

        const errorChannel = client.channels.cache.get(channelIds.errorChannel);
        errorChannel.send({
            embeds: [{
                color: 0xed616f,
                title: `__Database error__ occurred!`,
                description: `\`\`\`${error}\`\`\``,
                timestamp: new Date().toISOString()
            }]
        })
    }
}