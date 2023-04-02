const { Schema, model } = require('mongoose');

const balanceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    balance: { 
        type: Number, 
        default: 0 
    }
})

module.exports = model( // This doesn't have to be on multiple lines, It's just for the comments below lol
    'Balance', // Model name
    balanceSchema, // The actual schema
    'balances' // Collection name (in the Mongo Database this will go into the 'examples' collection (I think))
);
