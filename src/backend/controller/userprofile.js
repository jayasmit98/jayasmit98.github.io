const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const userdb=require('../models/user');
const Nexmo = require('nexmo');
const { findOneAndUpdate } = require('../models/user');


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
        image:req.file.filename
    })
    req.session.image=req.file.filename;
    
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

module.exports={
    update:update,
    passwordchange:passwordchange
    
}
