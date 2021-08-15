const mongoose = require('mongoose');

const slots = new mongoose.Schema({
    time:{
        type:String
    },
    days:{
        type:String
    },
    isbooked:{
        type:Boolean
    },
    isDisabled:{
        type:Boolean
    }
});

const schedule = new mongoose.Schema({
    email:{
        type:String
    },
    days:{
        type:String
    },
    hospital:{
        type:String
    },
    starttime:{
        type:String
    },
    endtime:{
        type:String
    },
    intervals:{
        type:String
    },
    date:{
        type:String
    },
    createdby:{
        type:String
    },
    slots:[slots]
})

const sched = mongoose.model("Schedule",schedule);
module.exports=sched;