const mongoose = require('mongoose');

const recordschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    title:{
        type:String
    },
    date:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    image:{
        type:Array
    },
    report:{
        type:String,
        require:true
    }
});

const recorddets=mongoose.model("records",recordschema);
module.exports=recorddets;