const mongoose = require('mongoose');

const bookslot = new mongoose.Schema({
    docname:{
        type:String
    },
    email:{
        type:String
        
    },
    docid:{
        type:String
    },
    hospital:{
        type:String
    },
    date:{
        type:String
    },
    scheduleid:{
        type:String
    },
    slotid:{
        type:String
    },
    status:{
        type:String
    },
    username:{
        type:String
    },
    day:{
        type:String
    },
    slottime:{
        type:String
    },
    mobileno:{
        type:Number
    },
    userid:{
        type:String
    },
    checkdate:{
        type:String
    }
})

const bookings=mongoose.model('Boooking', bookslot);
module.exports=bookings;