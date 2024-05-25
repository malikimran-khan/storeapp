const mongoose = require('mongoose')

const laptopschema = new mongoose.Schema({
    laptopname:String,
    laptopcompany:String,
    laptopprice:String,
    condition:String,
    image:String
});
const laptopmodel = mongoose.model('laptop' , laptopschema)
module.exports = laptopmodel