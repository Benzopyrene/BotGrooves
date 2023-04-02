// Fetches the value of balance if it is stored in the DB
const mongoose = require('mongoose');
const Balance = require('../../schemas/balance');

module.exports = (client) => {
    client.fetchBalance = async (userId) => {
        let storedBalance = await Balance.findOne({ userId: userId });

        if (!storedBalance) {
            storedBalance = new Balance({
                _id: mongoose.Types.ObjectId(),
                userId: userId
            })

            await storedBalance.save().then(async balance => { // Idk why this .then(async ) thing is here but the tutorial said to - I'll remove it if I dont need it later
                // console.log(`New Balance document created and saved! (${userId})`)
            }).catch(console.error);

            return storedBalance;
        } else {
            return storedBalance;
        }
    }
}