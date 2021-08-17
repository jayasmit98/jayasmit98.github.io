const mongoose = require('mongoose');
const hospitalschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
        
    },
    speciality:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    beds:{
        type:Number,
        required:true
    },
    treatments:{
        type:String,
        required:true
    }

})

const hospitaldetails = mongoose.model("hospitaldets",hospitalschema);
module.exports=hospitaldetails;