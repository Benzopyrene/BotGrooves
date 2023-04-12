const { Schema, model } = require('mongoose');

const statsSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    chatCoins: { 
        type: Number, 
        default: 0 
    }
})

module.exports = model( // This doesn't have to be on multiple lines, It's just for the comments below lol
    'Stats', // Model name
    statsSchema, // The actual schema
    'stats' // Collection name
);
