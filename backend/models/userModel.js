 
const { Schema, model} = require('../connection');

const mySchema = new Schema({
  email : {type: String, required: true},
  name : {type: String, required: true},
  password : {type: String, required: true},
  cpassword : {type: String, required: true},
   
   

});


module.exports = model('user', mySchema);