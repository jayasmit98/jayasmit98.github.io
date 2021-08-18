const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const userdb=require('../models/user');
const reportdb = require('../models/records');
const doctordb = require('../models/docdetail');
const Nexmo = require('nexmo');



const update = async (req,res)=>{
    
    const user = await userdb.findOneAndUpdate({email:req.session.email},{
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        dob:req.body.dob,
        phone:req.body.phone,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        image:req.file?req.file.filename:req.session.image,
    })
    if(req.file){
        req.session.image=req.file.filename;
    }
    
    if(req.session.user.fees){
        const docupdate = await doctordb.findOneAndUpdate({email:req.session.user.email},{
            description: req.body.description,
            email: req.body.email,
            hospitals: req.body.hospitals,
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

            image:req.file?req.file.filename:req.session.image

        })
    }
    res.redirect('/profile');
}
const passwordchange = async (req,res,next) => {
    const curp=req.body.old_password;
    const newp=req.body.new_password;
    const confp=req.body.confirm_password;
    try{
        if(newp != confp){
            return res.redirect('/settings');
        }
        if(req.session.user.password== newp){
            return res.redirect('/settings');
        }
        if(curp!=req.session.user.password){
            return res.redirect('/settings');
        }
        var user = await userdb.findOneAndUpdate(
            {email:req.session.email},
            {password:newp}
        )
        if(user){
            console.log('password has been updated');
            req.session.destroy(() => {
                console.log('session destroyed');
            });
            return res.redirect("/");
        };
    } catch(err){
        console.log(err);
        return res.redirect('/settings');
    }
}

const addrecord = async (req,res) => {
    try{  
        const title = req.body.title;
        const email = req.session.user.email;
        const name = req.body.name;
        const date = req.body.date;
        const report = req.body.report;
        const imarr = req.files;
        const pics = [];
        if(imarr){
            for(var i=0;i<imarr.length;i++){
                pics.push(imarr[i].filename);
            }
        }
        console.log(pics);
        
        const reports = await reportdb.create({
            email:email,
            name:name,
            title:title,
            image:pics,
            report:report,
            date:date
        });
        const repdata = await reports;
        if(repdata){
            console.log("report added successfully");
            return res.redirect("/records");
        }
    }
    catch(err){
        console.log(err);
        return res.redirect("/records");
    }
}

const showrecord = async (req,res) => {
    const find = await reportdb.find({email:req.session.user.email});
    var quant = find.length;
    return res.render("medicalreport",{
        record:find,
        user:req.session.user,
    })
}

const deleterecord = async (req,res) => {
    const recordid = req.params.recordid;
    try{
        const findtodel = await reportdb.findOneAndDelete({_id:recordid});
        if(findtodel){
            console.log("slot deleted successfully");
            return res.redirect("/records");    
        }

    }
    catch(err){
        console.log(err);
        console.log("Error deleting the record");
        return res.redirect("/records");
    }   
}

const logout = async (req,res) => {
    req.session.destroy(()=>{
        console.log("session destroyed");
    });
    return res.redirect("/");
}

module.exports={
    update:update,
    passwordchange:passwordchange,
    addrecord:addrecord,
    showrecord:showrecord,
    deleterecord:deleterecord,
    logout:logout
}
