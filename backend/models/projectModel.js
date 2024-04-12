
const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
  data: { type: Object },
  icon: { type: String },
  createdAt: { type: date, default: Date.now },
});


module.exports = model('project', mySchema);