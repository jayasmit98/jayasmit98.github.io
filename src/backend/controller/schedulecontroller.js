const mongoose = require("mongoose");
const schedule = require("../models/schedule");
const docdetails = require("../models/docdetail");
const appoint = require("../models/bookings");
const { findOne } = require("../models/schedule");
const getschedule = async (req,res) => {
    var exist = await schedule.find({email:req.session.email});
    var countslots = await schedule.findOne({email:req.session.email}).countDocuments();

    res.render("addschedule",{
        user:req.session.user,
        countscheds:countslots,
        exist:exist,
    })
}

const addschedule = async (req,res) => {
    console.log('working');
    const doc = await docdetails.findOne({email:req.session.email});
    if(doc){
        console.log("found");
        const email=req.session.email;
        const days=req.body.days;
        const from = req.body.st_time;
        const till = req.body.end_time;
        const interval = req.body.intervals;
        const hospital = req.body.hospital;
        const createdby = doc._id;
        const date = new Date();
        var st = from;
        var end = till;
        var ende = till.split(":");
        var endhr = parseInt(ende[0]);
        var endmin = parseInt(ende[1]);
        var slotsarr = [{time:st, days:req.body.days, isbooked:false, isdisabled:false}];
        var ste=st.split(":");
        console.log(ste);
        console.log(interval);
        while(st!=end){
            
            var ste=st.split(":");
            var sthr=parseInt(ste[0]);
            var stmin=parseInt(ste[1]);
            
            if(sthr>=endhr && stmin>=endmin){
                break;
            }
            intervaltime=parseInt(interval);
            if(stmin+intervaltime>=60){
                stmin=(stmin+intervaltime-60);
                intervaltime=00;
                stmin=(stmin+intervaltime);
                sthr=sthr+1;
                
                if(sthr>=24){
                    sthr=1;
                }
            }
            else{
                stmin=(stmin+intervaltime);
            }
            console.log(stmin);
            var result=sthr+":"+stmin;
            slotsarr.push({time:result, days:days, isbooked:false, isDisabled:false});
            st=result.toString();           
        }
        try{
            const appo = await schedule.findOne({
                email:email, days:days, starttime:from
            });
            if(appo){
                console.log("Unable to create a schedule");
                res.redirect("/add-schedule");
            }
            else{
                const schedu = await schedule.create({
                    email:email,
                    days:days,
                    starttime:from,
                    endtime:till,
                    intervals:interval,
                    date:date,
                    hospital:hospital,
                    slots:slotsarr,
                    createdby:createdby
                })
                if(schedu){
                    console.log("slot created successfully");
                    res.redirect("/add-schedule");
                }
            }
        }
        catch(err){
            console.log(err);
            res.redirect("/add-schedule");
        }
    }
};

const removeschedule = async (req,res) => {
    var schedtodel = req.params.schedid;
    const find = await schedule.findOneAndRemove({_id:schedtodel});
    if(find){
        console.log('successfully deleted the schedule');
    }
    else{
        console.log("couldn't delete the schedule");
    }
    res.redirect("/add-schedule");
}

const slotdel = async (req,res) => {
    const slotdisid = req.params.slotid;
    const schedid = req.params.scheduleid;
    try{
        const find = await schedule.findOne({_id:schedid});
        if(find){
            for(var i=0;i<find.slots.length-1;i++){
                if(find.slots[i]._id==slotdisid){
                    if(!(find.slots[i].isDisabled)){
                        find.slots[i].isDisabled=true;
                    }
                    else{
                        find.slots[i].isDisabled=false;
                    }
                    await find.save();
                    break;
                }
                
            }

        } 
        else{
            console.log("Error in disabling slot");
        }
        return res.redirect("/add-schedule")
    }
    catch(err){
        console.log(err);
        return res.redirect("/add-schedule");
    }
}

const removeall = async (req,res) => {
    const schedid = req.params.scheduleid;
    const find = await schedule.findOne({_id:schedid});
    try{    
        if(find){
            for(var i=0;i<find.slots.length-1;i++){
                find.slots[i].isDisabled=true;
                await find.save();
            }
        }
        else{
            console.log("Error encountered in disabling slots");
            
        }
        return res.redirect("/add-schedule");
    }
    catch(err){
        console.log(err);
        return res.redirect("add-schedule");
    }

}

const showappointments = async (req,res) => {
    if(!req.session.user.isdoctor){
        var bookingdets = await appoint.find({email:req.session.user.email});
        var upcoming=[];
        var completed = [];
        for(var k=0;k<bookingdets.length;k++){
            var checkdate = bookingdets[k].checkdate.split(" ");
            var date = new Date();
            var month = parseInt(date.getMonth());
            var day = parseInt(date.getDate());
            var year = parseInt(date.getFullYear());
            if(day>parseInt(checkdate[1]) && month>=parseInt(checkdate[0]) && year>=parseInt(checkdate[2])){
                completed.push(bookingdets[k]);
                var scheduleid = bookingdets[k].scheduleid;
                var slotid = bookingdets[k].slotid;
                var schedule = await findOne({_id:scheduleid});
                var slot = schedule.slots.id(slotid);
                slot.isbooked = false;
                await schedule.save();

            }
            else{
                upcoming.push(bookingdets[k]);
            }
        }
    }
    else{
        var bookingdets = await appoint.find({docid:req.session.user._id});
        var upcoming=[];
        var completed = [];
        for(var k=0;k<bookingdets.length;k++){
            var checkdate = bookingdets[k].checkdate.split(" ");
            var date = new Date();
            var month = parseInt(date.getMonth());
            var day = parseInt(date.getDate());
            var year = parseInt(date.getFullYear());
            if(day>parseInt(checkdate[1]) && month>=parseInt(checkdate[0]) && year>=parseInt(checkdate[2])){
                completed.push(bookingdets[k]);
                var scheduleid = bookingdets[k].scheduleid;
                var slotid = bookingdets[k].slotid;
                var schedule = await findOne({_id:scheduleid});
                var slot = schedule.slots.id(slotid);
                slot.isbooked = false;
                await schedule.save();

            }
            else{
                upcoming.push(bookingdets[k]);
            }
        }
    }
}

module.exports={
    addschedule:addschedule,
    getschedule:getschedule,
    removeschedule:removeschedule,
    slotdel:slotdel,
    removeall:removeall
}