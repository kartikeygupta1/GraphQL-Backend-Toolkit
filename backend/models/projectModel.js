const { model, Schema, Types } = require("../connection");

const codeSchema = new Schema({
    user: {type : Types.ObjectId, ref: 'user'},
    name : String,
    config: {type : Object },
    createdAt: {type: Date, default: Date.now}
});

module.exports = model("project", codeSchema);