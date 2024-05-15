const { Schema, model } = require('../connection');

const mySchema = new Schema({
    rating: String,
    username:String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now },

});

module.exports = model('feedback', mySchema);