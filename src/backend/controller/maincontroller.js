const express = require("express");
const docdetaildb = require("../models/docdetail");
var login = (req,res)=>{
    
    
    res.render("login", {error:req.session.error, session:req.session, errorType:req.session.errorType});
}
var index = (req,res) => {
    if(req.session.cnt){
        req.session.cnt++;
    }
    else{
        req.session.cnt=1;
    }
    console.log(req.session.cnt);
    console.log(req.session.name);
    res.render("index", {error:req.session.error,name:req.session.user.name, session:req.session, errorType:req.session.errorType, cnt:req.session.cnt, img:req.session.image});
}
var phonelogin =(req,res) => {
    res.render("phonelogin",{error:req.session.error, session:req.session, errorType:req.session.errorType});
}
var otp = (req,res) => {
    res.render("otp", {error:req.session.error, session:req.session, errorType:req.session.errorType});
}
var signup = (req,res) => {
    res.render("signup",{name:req.session.name});
}
var doctor = async (req,res) =>{
    var alldocs=await docdetaildb.find();
    req.session.doctors=alldocs;
    res.render("doctor",{name:req.session.name, docs:req.session.doctors});
}
var docdetail = (req,res) => {
    res.render("docdetail",{name:req.session.name});
}
var addschedule = (req,res) => {
    res.render("addschedule",{name:req.session.name});
}
var profile = (req,res) => {
    res.render("profile",{name:req.session.name, user:req.session.user, img:req.session.image});
}
var appointment = (req,res) => {
    res.render("appointment",{name:req.session.name});
}
var medicalreport = (req,res) => {
    res.render("medicalreport",{name:req.session.name});
}
var settings = (req,res) => {
    res.render("settings",{name:req.session.name, user:req.session.user});
}
var hospitals = (req,res) =>{
    res.render("hospital",{name:req.session.name});
}
var treatment = (req,res) => {
    res.render("Dentistry",{name:req.session.name});
}
var about = (req,res) => {
    res.render("about-us",{name:req.session.name});
}
var tvastraplus=(req,res) => {
    res.render("tvastra-plus",{name:req.session.name});
}
var query = (req,res) => {
    res.render("query",{name:req.session.name})
}
var faq = (req,res) => {
    res.render("FAQ",{name:req.session.name});
}
var contact = (req,res) => {
    res.render("contact",{name:req.session.name});
}
var abouthospital = (req,res) => {
    res.render("about-hospital",{name:req.session.name});
}

var doctorprofile = (req,res) => {
    res.render("doctor-profile",{name:req.session.name});
}

var booking = (req,res) => {
    res.render("booking",{
        user:req.session.user,
        scheduleid:req.session.scheduleid,
        slotbooktime:req.session.slotbooktime,
        bookingdate:req.session.bookingdate,
        hospitals:req.session.hospitals,
        qualification:req.session.qualification,
        docname:req.session.docname,
        docimg:req.session.docimg,
    })
}

var rescheduleget = async (req,res) => {
    console.log(req.session.curdocid);
    var curdoc = await docdetaildb.findOne({_id:req.session.curdocid});
    console.log(curdoc);
    return res.render("reschedule",{
        docs:curdoc,
        name:req.session.user.name
    })
}
module.exports={
    login:login,
    index:index,
    phonelogin:phonelogin,
    otp:otp,
    signup:signup,
    doctor:doctor,
    appointment:appointment,
    settings:settings,
    medicalreport:medicalreport,
    profile:profile,
    addschedule:addschedule,
    hospitals:hospitals,
    treatment:treatment,
    about:about,
    tvastraplus:tvastraplus,
    query:query,
    faq:faq,
    contact:contact,
    abouthospital:abouthospital,
    doctorprofile:doctorprofile,
    docdetail:docdetail,
    booking:booking,
    rescheduleget:rescheduleget
};