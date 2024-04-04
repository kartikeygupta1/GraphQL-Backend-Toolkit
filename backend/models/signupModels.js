const { models } = require('mongoose');
const { Schema, model} = require('../connection');

const mySchema = new Schema({
  name : {type: String, required: true},
  email : {type: String, required: true},
  
  password : {type: String, required: true},
  cpassword : {type: String, required: true},
   
   

});


module.exports = model('signup', mySchema);