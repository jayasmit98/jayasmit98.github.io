const mongoose = require('mongoose');
const docdets = require('../models/docdetail');
const hospitaldb = require('../models/hospitals');

const updatedoc = async (req,res) => {
    console.log(req.session.user);
    console.log(req.body.hospital);
    const hosp = req.body.hospital;
    console.log(hosp);
    try{
        const newdoc = await docdets.create({
            name:req.session.user.name,
            email:req.session.user.email,
            password:req.session.user.password,
            description:req.body.description,
            hospitals:req.body.hospital,
            achievements:req.body.achievements,
            experience:req.body.experience,
            qualification:req.body.qualification,
            awards:req.body.awards,
            specialization:req.body.specialization,
            fees:req.body.fees,
            image:req.file.filename?req.file.filename:"undefined",
            gender:req.session.user.gender,
            dob:req.session.user.dob,
            phone:req.session.user.phone,
            state:req.session.user.state,
            city:req.session.user.city,
            country:req.session.user.country
        })
        console.log("hospital length is "+(JSON.parse(hosp)).length);
        for(var i=0;i<(JSON.parse(hosp)).length;i++){
            var hospitalexists = await hospitaldb.findOne({name:(JSON.parse(hosp))[i].value});
            if(!hospitalexists){
                var hospregister = await hospitaldb.create({
                    name:(JSON.parse(hosp))[i].value,
                    description:"No info available",
                    speciality:req.body.specialization,
                    image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fhospital-construction-service-20189297491.html&psig=AOvVaw0CDyc9z29nbMeVwdO2FFp7&ust=1629223050054000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjzjPyOtvICFQAAAAAdAAAAABAD",
                    location:"No info Available",
                    beds:20,
                    treatments:req.body.specialization
                });
                if(hospregister){
                    console.log("hospital created",i);
                }
            }
        }
        req.session.doctor=newdoc;
        res.redirect('/index');
    }
    catch(err){
        console.log(err);
        res.redirect("/docdetail");
    }
}

module.exports = {
    updatedoc:updatedoc
}