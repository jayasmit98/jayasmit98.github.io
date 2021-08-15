const mongoose = require('mongoose');
const docdets = require('../models/docdetail');

const updatedoc = async (req,res) => {
    console.log(req.session.user);
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
            image:req.file.filename,
            gender:req.session.user.gender,
            dob:req.session.user.dob,
            phone:req.session.user.phone,
            state:req.session.user.state,
            city:req.session.user.city,
            country:req.session.user.country
        })
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