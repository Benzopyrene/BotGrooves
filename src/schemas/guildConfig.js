const { Schema, model } = require('mongoose');

const guildConfigSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    chatCoinsCooldown: Number,
    chatCoinsRoleMultis: Array,
    chatCoinsChannelMultis: Array

    // Add more parts as I require
})

module.exports = model(
    'GuildConfig', // Model name
    guildConfigSchema, // The actual schema
    'guildConfig' // Collection name
);