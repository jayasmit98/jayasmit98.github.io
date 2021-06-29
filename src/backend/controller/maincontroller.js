const express = require("express");
var index = (req,res)=>{
    res.render("index");
    
}
var doctor = (req,res) =>{
    res.render("doctor");
}
var hospitals = (req,res) =>{
    res.render("hospital");
}
var treatment = (req,res) => {
    res.render("Dentistry");
}
var about = (req,res) => {
    res.render("about-us");
}
var tvastraplus=(req,res) => {
    res.render("tvastra-plus");
}
var query = (req,res) => {
    res.render("query")
}
var faq = (req,res) => {
    res.render("FAQ");
}
var contact = (req,res) => {
    res.render("contact");
}
var abouthospital = (req,res) => {
    res.render("about-hospital");
}

var doctorprofile = (req,res) => {
    res.render("doctor-profile");
}
module.exports={
    index:index,
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