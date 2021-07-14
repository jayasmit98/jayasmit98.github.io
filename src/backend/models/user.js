const mongoose = require('mongoose');

const user = new mongoose.Schema({
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
    }
})

const users=mongoose.model('userdb', user);
module.exports=users;
