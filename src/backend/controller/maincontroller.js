const express = require("express");
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
    res.render("index", {error:req.session.error,name:req.session.name, session:req.session, errorType:req.session.errorType, cnt:req.session.cnt});
}
var signup = (req,res) => {
    res.render("signup",{name:req.session.name});
}
var doctor = (req,res) =>{
    res.render("doctor",{name:req.session.name});
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
module.exports={
    login:login,
    index:index,
    signup:signup,
    doctor:doctor,
    hospitals:hospitals,
    treatment:treatment,
    about:about,
    tvastraplus:tvastraplus,
    query:query,
    faq:faq,
    contact:contact,
    abouthospital:abouthospital,
    doctorprofile:doctorprofile,
};