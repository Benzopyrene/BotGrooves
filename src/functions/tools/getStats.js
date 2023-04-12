// Returns false if no stats file is found
const Stats = require('../../schemas/stats');

module.exports = (client) => {
    client.getStats = async (userId) => {
        const storedStats = await Stats.findOne({ userId: userId });

        if (!storedStats) {
            return false;
        } else {
            return storedStats;
        }
    }
}