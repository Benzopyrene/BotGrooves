// Fetches the value of stats if it is stored in the DB
const mongoose = require('mongoose');
const Stats = require('../../schemas/stats');

module.exports = (client) => {
    client.fetchStats = async (userId) => {
        let storedStats = await Stats.findOne({ userId: userId });

        if (!storedStats) {
            storedStats = new Stats({
                _id: new mongoose.Types.ObjectId(),
                userId: userId
            })

            await storedStats.save().catch(console.error);

            return storedStats;
        } else {
            return storedStats;
        }
    }
}