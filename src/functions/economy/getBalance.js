// Returns false if no balance is found
const Balance = require('../../schemas/balance');

module.exports = (client) => {
    client.getBalance = async (userId) => {
        const storedBalance = await Balance.findOne({ userId: userId });

        if (!storedBalance) {
            return false;
        } else {
            return storedBalance;
        }
    }
}