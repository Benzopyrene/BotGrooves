// Fetches the value of balance if it is stored in the DB
const mongoose = require('mongoose');
const Balance = require('../../schemas/balance');

module.exports = (client) => {
    client.fetchBalance = async (userId) => {
        let storedBalance = await Balance.findOne({ userId: userId });

        if (!storedBalance) {
            storedBalance = new Balance({
                _id: new mongoose.Types.ObjectId(),
                userId: userId
            })

            await storedBalance.save().catch(console.error);

            return storedBalance;
        } else {
            return storedBalance;
        }
    }
}