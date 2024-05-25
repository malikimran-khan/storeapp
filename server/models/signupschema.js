const mongoose = require('mongoose');

const signupschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirmpassword: String
});
const signupmodel = mongoose.model('loginsignup' , signupschema);
module.exports=signupmodel