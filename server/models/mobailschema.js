const mongoose = require('mongoose')

const mobailschema = new mongoose.Schema({
    company:String ,
    color : String ,
    model : String , 
    ram : String , 
    memory : String , 
    image : String 
});
const mobailmodel = mongoose.model("mobailschema" , mobailschema)
module.exports = mobailmodel