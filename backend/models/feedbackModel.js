const { model, Schema, Types } = require("../connection");

const codeSchema = new Schema({
    name : String,
    email : String,
    rating: Number,
    review: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = model("feedback", codeSchema);