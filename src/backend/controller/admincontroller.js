const mongoose = require('mongoose');
const docdb = require('../models/docdetail');
const hospdb = require('../models/hospitals');
const recordsdb = require('../models/records');
const scheduledb = require('../models/schedule');
const userdb= require('../models/user');
const bookingdb = require('../models/bookings');

const adminhomeget = async (req,res) => {
    const usercnt = await userdb.find({isdoctor:false});
    const doctors = await docdb.find();
    const appointments = await bookingdb.find();
    const hospitals = await hospdb.find();
    return res.render("adminhome",{
        user:usercnt,
        doctors:doctors,
        appointments:appointments,
        hospitals:hospitals
    });
};

const adminusersget = async (req,res) => {
    const users = await userdb.find({isdoctor:false});
    return res.render("adminusers",{
        users:users
    })
};

const admindoctorsget = async (req,res) => {
    const doctors = await docdb.find();
    return res.render("admindoctors",{
        doctors:doctors
    });
};

const adminhospitalsget = async (req,res) => {
    const hospitals = await hospdb.find();

    return res.render("adminhospitals",{
        hospitals:hospitals
    });
};

const adminusersprofileget = async (req,res) => {
    const useremail = req.params.useremail;
    var userfind = await userdb.findOne({email:useremail});
    return res.render("adminusersprofile",{
        users:userfind
    }) 
};

const adminusersappget = async (req,res) => {
    const useremail = req.params.useremail;
    var bookingdets = await bookingdb.find({email:useremail});
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
    return res.render("adminusersapp",{
        upcomingdets:upcoming,
        completeddet:completed,
        userem:useremail
    })
}

const adminuserreportsget = async (req,res) => {
    const useremail = req.params.useremail;
    const find = await recordsdb.find({email:useremail});
    return res.render("adminrecords",{
        record:find,
    })
}

const adminhospdetget = async (req,res) => {
    const hospid = req.params.hospitalid;
    const hospfind = await hospdb.findOne({_id:hospid});
    return res.render("adminhospdets",{
        hospdets:hospfind
    })
}

const docadminapp = async (req,res) => {
    const docid = req.params.doctorid;
    var bookingdets = await bookingdb.find({docid:docid});
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
    return res.render("docadminapp",{
        completeddets:completed,
        upcomingdets:upcoming,
        
    })
}

const docadminprofileget = async (req,res) => {
    const docid = req.params.doctorid;
    const docfind = await docdb.findOne({_id:docid});
    return res.render("docadminprofile",{
        doctordetails:docfind
    })
}

const adminprofiledetpost = async (req,res) => {
    console.log(req.body.name);
    const userid = req.params.userid;
    console.log(userid);
    const og = await userdb.findOne({_id:userid});
    try{
        const user = await userdb.findByIdAndUpdate({_id:userid},{
            name:req.body.name,
            email:req.body.email,
            gender:req.body.gender,
            dob:req.body.dob,
            phone:req.body.phone,
            city:req.body.city,
            state:req.body.state,
            country:req.body.country,
            image:req.file? req.file.filename : og.image,
        })
        if(user){
            console.log("user profile modified successfully");
            res.redirect('/adminusers');
        }
    }
    catch(err){
        console.log(err);
        res.redirect('/adminusers');
    }    
}

const docadmindetpost = async (req,res) => {
    const doctorid = req.params.doctorid;
    const findog = await docdb.findOne({_id:doctorid});
    try{
        const docupdate = await docdb.findByIdAndUpdate({_id:doctorid},{
            description: req.body.description,
            email: req.body.email,
            hospitals: req.body.hospital,
            achievements: req.body.achievements,
            experience: req.body.experience,
            qualification: req.body.qualifications,
            awards: req.body.awards,
            specialization: req.body.specialization,
            fees: req.body.fees,
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            dob: req.body.dob,
            phone: req.body.phone,
            state: req.body.state,
            city: req.body.city,
            country: req.body.country,
    
            image:req.file?req.file.filename:findog.image
    
        })
        if(docupdate){
            console.log("doctor edited successfully");
            return res.redirect("/admindoctors");
        }
    }
    catch(err){
        console.log(err);
        return res.redirect("/admindoctors");
    }
}

const deleteapp = async (req,res) => {
    var scheduleid = req.params.schedule_id;
    var slotid = req.params.slot_id;
    const routeemail = req.params.useremail;
    try{
        var schedule = await scheduledb.findOne({_id:scheduleid});
        var slot = schedule.slots.id(slotid);
        slot.isbooked=false;
        await schedule.save();
        const findbook = await bookingdb.findOneAndRemove({slotid:slotid});
        if(findbook){
            console.log("successfully deleted booking");
            res.redirect("/adminuserapp/"+routeemail);
        }
    }
    catch(err){
        console.log(err);
        res.redirect("/adminuserapp/" + routeemail);
    }
}

const edithospital = async (req,res) => {
    var hospid = req.params.hospitalid;
    const hospog = await hospdb.findOne({_id:hospid});
    try{
        const findhosp = await hospdb.findByIdAndUpdate({_id:hospid},{
            name:req.body.hospname,
            description:req.body.hospdesc,
            speciality:req.body.speciality,
            image:req.file?req.file.filename:hospog.image,
            location:req.body.address,
            beds:req.body.beds,
            treatments:req.body.treatments,

        });
        if(findhosp){
            console.log("hospital details updated successfully");
            return res.redirect("/adminhospitals");
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/adminhospitals');
    }

}

module.exports = {
    adminhomeget:adminhomeget,
    adminusersget:adminusersget,
    admindoctorsget:admindoctorsget,
    adminhospitalsget:adminhospitalsget,
    adminusersprofileget:adminusersprofileget,
    adminusersappget:adminusersappget,  
    adminuserreportsget:adminuserreportsget,
    adminhospdetget:adminhospdetget,
    docadminapp:docadminapp,
    docadminprofileget:docadminprofileget,
    adminprofiledetpost:adminprofiledetpost,
    docadmindetpost:docadmindetpost,
    deleteapp:deleteapp,
    edithospital:edithospital
}

