const Balance = require('../../schemas/balance');
const Stats = require('../../schemas/stats');
const { chatCoinsServerId } = require('../../../config.json');
const GuildConfig = require('../../schemas/guildConfig');
const mongoose = require('mongoose');



module.exports = {
	name: 'chatCoins',
	isHuman: true,
    allMessages: true,
	execute: async (message, client) => {

        if (message.guild.id == chatCoinsServerId) {

            // const storedBalance = await client.fetchBalance(message.author.id); // Creates Balance if none already made
            // const storedStats = await client.fetchStats(message.author.id); // Now I am just using { upsert: true }

            let guildConfigFile = await GuildConfig.findOne({ guildId: message.guild.id });
            if (!guildConfigFile) {
                guildConfigFile = new GuildConfig({
                    _id: new mongoose.Types.ObjectId(),
                    guildId: message.guild.id
                });
                guildConfigFile.save();
            }

            const roleMultis = guildConfigFile.chatCoinsRoleMultis;
            const channelMultis = guildConfigFile.chatCoinsChannelMultis;

            const baseChatCoins = 1; // Might wanna do something with this, idk tbh
            let multi = 0;

            for (const i in roleMultis) {
                if (message.member.roles.cache.some(role => role.id === roleMultis[i].id)) {
                    multi += Number(roleMultis[i].multi);
                }
            }

            for (const i in channelMultis) {
                if (message.channel == channelMultis[i].id) {
                    multi += Number(channelMultis[i].multi);
                }
            }

            const amount = Math.round(multi > 0 ? multi * baseChatCoins : baseChatCoins);

            await Balance.findOneAndUpdate(
                { userId: message.author.id },
                { $inc: { balance: amount } },
                { upsert: true }
            );

            await Stats.findOneAndUpdate(
                { userId: message.author.id },
                { $inc: { chatCoins: amount } },
                { upsert: true }
            )
            
            await client.setCooldown(`${message.author.id}/trigger/chatCoins`, guildConfigFile.chatCoinsCooldown); // 5s - Overwrites the default cooldown to be the guildConfig one
            
        }
    }
}