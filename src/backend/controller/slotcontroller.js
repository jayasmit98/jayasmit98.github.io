const mongoose = require('mongoose');
const sched = require('../models/schedule');
const docdet = require('../models/docdetail');
const appointment = require('../models/bookings'); 

const getslots = async (req,res) => {
    const id = req.params.docid;
    var slotsar = [0,0,0,0,0,0,0];
    var darr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const findthesched = await sched.find({createdby:id});
    var compar=[];
    for(var l=0;l<7;l++){
        var date = new Date();
        var day = date.getDay() + l;
        if(day<7){
            compar.push(darr[day]);
        }
        else{
            compar.push(darr[day-7]);
        }
    }
    if(findthesched){
        for(var p=0;p<7;p++){
            console.log(findthesched.length);
            for(var a=0;a<findthesched.length;a++){
                
                if(compar[p]==findthesched[a].days){
                    for(var k=0;k<findthesched[a].slots.length-1;k++){
                        if((!findthesched[a].slots[k].isDisabled) && (!findthesched[a].slots[k].isbooked)){
                            slotsar[p]+=1;
                            
                        }
                    }
                }
            }
        }
    }
    res.status(200).send(slotsar);
}

const slotsp = async (req,res) => {
    console.log("activating");
    const id = req.params.docid;
    const ind = parseInt(req.params.index);
    var daten = new Date();
    var day = daten.getDay() + ind;
    if(day>7){
        day=day-7;
    }
    var morning=[];
    var afternoon = [];
    var evening = [];
    switch(day){
        case 0:
            var nday = "sunday";
            break;
        case 1:
            var nday = "monday";
            break;
        case 2:
            var nday = "tuesday";
            break;
        case 3:
            var nday = "wednesday";
            break;
        case 4:
            var nday = "thursday";
            break;
        case 5:
            var nday = "friday";
            break;
        case 6:
            var nday = "saturday";
    }

    var findsl = await sched.findOne({createdby:id, days:nday});
    if(findsl){
        var slotsarr = findsl.slots;
        var sid = findsl._id;
        for(var i=0;i<slotsarr.length-1;i++){
            var time = slotsarr[i].time.split(":");
            time = parseInt(time);
            if(time<12 && !(slotsarr[i].isbooked) && !(slotsarr[i].isdisabled)){
                morning.push(slotsarr[i]);
            }
            else if(time>=12 && time<18 && !(slotsarr[i].isbooked) && !(slotsarr[i].isDisabled)){
                afternoon.push(slotsarr[i]);
            }
            else if(time >=18 && !(slotsarr[i].isbooked) && !(slotsarr[i].isDisabled)){
                evening.push(slotsarr[i]);
            }
        }
    }

    res.send([morning,afternoon,evening,sid]);
}

const slotclick = async (req,res) => {
    var scheduleid=req.params.schedule_id;
    var doctorid= req.params.did;
    var slotid = req.params.slot_id;
    var slottime = req.params.slot_time;
    req.session.slotbooktime=slottime;
    req.session.docid=doctorid;
    req.session.scheduleid=scheduleid;
    req.session.slotid=slotid;
    var doc = await docdet.findOne({_id:doctorid});
    req.session.docname = doc.name;

    var qualification = doc.qualification;
    var qual = JSON.parse(qualification);
    var str='';
    for(var i=0;i<qual.length;i++){
        str=str + qual[i].value+ ", ";
    }
    req.session.qualification=str;

    var hospital=doc.hospitals;
    var hosp = JSON.parse(hospital);
    var h = '';
    for(var i=0;i<hosp.length;i++){
        h=h + hosp[i].value+ ", ";
    }
    req.session.hospitals=h;

    req.session.docimage=doc.image;

    var findsched = await sched.findOne({_id:scheduleid});
    var day = findsched.days;
    req.session.dayofbook=day;
    switch(day){
        case "sunday":
            var dayno=0;
            break;
        case "monday":
            var dayno=1;
            break;
        case "tuesday":
            var dayno=2;
            break;
        case "wednesday":
            var dayno=3;
            break;
        case "thursday":
            var dayno=4;
            break;
        case "friday":
            var dayno=5;
            break;
        case "saturday":
            var dayno=6;
    }
    var today= new Date();
    if(today.getDay()!=dayno){
        today.setDate(today.getDate() + (dayno - today.getDay() + 7)%7);
    }
    var marr = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var strd=day + ", " + marr[today.getMonth()] + " " + today.getDate()+ " " + today.getFullYear();
    var savedayforcheck=today.getMonth() +" "+today.getDate()+" "+today.getFullYear();
    req.session.bookingdate=strd;
    req.session.dateforcheck=savedayforcheck;
    if(req.session.user.isdoctor){
        console.log("doctors can't book a slot");
        res.redirect("/doctor");
    }
    else{
        
        res.redirect("/booking/"+scheduleid);
    }

}

const confirmapp = async (req,res) => {
    var scheduleid = req.params.schedule_id;
    var slotid= req.session.slotid;
    var docid=req.session.docid;
    var status= "Confirmed";
    console.log(req.session.currslotid);
    const appoint = await appointment.create({
        docname:req.session.docname,
        email:req.session.user.email,
        docid:docid,
        hospital:req.session.hospitals,
        date:req.session.bookingdate,
        scheduleid:scheduleid,
        slotid:slotid,
        status:status,
        username:req.session.user.name,
        day:req.session.dayofbook,
        slottime:req.session.slotbooktime,
        mobileno:req.session.user.phone,
        userid:req.session.user._id,
        checkdate:req.session.dateforcheck


    })
    try{
        if(appoint){
            
            req.session.bookid=appoint._id;
            var schedule = await sched.findOne({_id:scheduleid});
            var slot = schedule.slots.id(slotid);
            console.log("the slot is" + slot);
            slot.isbooked=true;
            await schedule.save();
            if(req.session.currslotid && req.session.currschedid){
                const currschedule = await sched.findOne({_id:req.session.currschedid});
                const currentslot = currschedule.slots.id(req.session.currslotid);
                currentslot.isbooked = false;
                await currschedule.save();
                const findbooking = await appointment.findOneAndRemove({slotid:req.session.currslotid});
            }
            console.log("Booked Successfully");
            req.session.currslotid=false;
            req.session.currschedid=false;
            res.redirect("/confirmappointment");
    
        }
    
    }
    catch(err){
        console.log(err);
        res.redirect('/confirmappointment');

    }

}

const showconfirm = async (req,res) => {
    res.render("confirmappointment", {
        user:req.session.user,
        scheduleid:req.session.scheduleid,
        slotbooktime:req.session.slotbooktime,
        bookingdate:req.session.bookingdate,
        hospitals:req.session.hospitals,
        qualification:req.session.qualification,
        docname:req.session.docname,
        docimg:req.session.docimg,
        bookid:req.session.bookid,
        slotid:req.session.slotid,
        docid:req.session.docid

    })
}

const reschedule = async (req,res) => {
    const prevslotid=req.params.slot_id;
    const prevschedid=req.params.schedule_id;
    const prevdocid=req.params.did;
    req.session.currslotid=prevslotid;
    req.session.currschedid=prevschedid;
    req.session.curdocid=prevdocid;
    res.redirect("/reschedule");
}

const deleteapp = async (req,res) => {
    var scheduleid = req.params.schedule_id;
    var slotid = req.params.slot_id;
    try{
        var schedule = await sched.findOne({_id:scheduleid});
        var slot = schedule.slots.id(slotid);
        slot.isbooked=false;
        await schedule.save();
        const findbook = await appointment.findOneAndRemove({slotid:slotid});
        if(findbook){
            console.log("successfully deleted booking");
            res.redirect("/appointments");
        }
    }
    catch(err){
        console.log(err);
        res.redirect("/appointments");
    }
}
module.exports= {
    getslots:getslots,
    slotsp:slotsp,
    slotclick:slotclick,
    confirmapp:confirmapp,
    showconfirm:showconfirm,
    reschedule:reschedule,
    deleteapp:deleteapp
}