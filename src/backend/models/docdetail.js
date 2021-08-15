const mongoose = require('mongoose');

const docdetail = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum: ['Male', 'Female'],
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        validate:{
            validator: function(num){
                return `${num}`.length === 10;
            },
            message: err => `${err.value} is not a valid number`
        }
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    hospitals:{
        type:String,
        required:true
    },
    achievements:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    awards:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    fees:{
        type:Number,
        required:true
    }
})

const docdetails = mongoose.model('DocDetails',docdetail);
module.exports=docdetails;