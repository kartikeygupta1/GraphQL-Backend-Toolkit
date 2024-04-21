const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: { type: String, required: true },
    email: String,
    password: String,
    avatar: String,
    role: { type: String, default: 'user' },
    created: { type: Date, default: Date.now }
});

module.exports = model('user', mySchema);