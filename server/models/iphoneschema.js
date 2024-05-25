const mongoose = require('mongoose')

const iphoneschema = new mongoose.Schema({
    name :String,
     color:String ,
      price :String,
       condition :String,
       image:String
})
const iphonemodel = mongoose.model("iphoneschema" , iphoneschema);
module.exports = iphonemodel;