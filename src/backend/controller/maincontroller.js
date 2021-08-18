const express = require("express");
const docdetaildb = require("../models/docdetail");
const userdb = require("../models/user");
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
    res.render("index", {error:req.session.error,name:req.session.user.name, session:req.session, errorType:req.session.errorType, cnt:req.session.cnt, img:req.session.image, user:req.session.user});
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
    let{page, ppi} = req.query;
    console.log(req.query);
    if(!page){
        page=1;
    }
    if(!ppi){
        ppi=3;
    }
    const skip = (page-1)*ppi;
    var alldocs=await docdetaildb.find().sort(req.session.sortBy);
    const cnt = alldocs.length;
    var finddocs = await docdetaildb.find().sort(req.session.sortBy).limit(ppi).skip(skip);
    if(req.session.query){
        var finddocs = await docdetaildb.find(req.session.query).sort(req.session.sortBy).limit(ppi).skip(skip);
        
    }
    req.session.doctors=finddocs;
    console.log(alldocs);
    console.log(finddocs);
    console.log("user",req.session.user);
    res.render("doctor",{name:req.session.name, docs:req.session.doctors, alldocs:alldocs, user:req.session.user, lastpage:Math.ceil(cnt/ppi), filter:req.session.filter?req.session.filter:"undefined"});
}
var docdetail = (req,res) => {
    res.render("docdetail",{name:req.session.name, user:req.session.user});
}
var addschedule = (req,res) => {
    res.render("addschedule",{name:req.session.name, user:req.session.user});
}
var profile = async (req,res) => {
    if(req.session.user.fees){
        var docs = await docdetaildb.findOne({email:req.session.user.email});
        req.session.user=docs;
        return res.render("profile",{name:req.session.name, user:req.session.user, img:req.session.user.image})
    } 
    var finduser = await userdb.findOne({_id:req.session.user._id});
    req.session.user=finduser;
    res.render("profile",{name:req.session.name, user:req.session.user, img:req.session.image});
}
var appointment = (req,res) => {
    res.render("appointment",{name:req.session.name, user:req.session.user});
}
var medicalreport = (req,res) => {
    res.render("medicalreport",{name:req.session.name, user:req.session.user});
}
var settings = (req,res) => {
    res.render("settings",{name:req.session.name, user:req.session.user});
}
var hospitals = (req,res) =>{
    res.render("hospital",{name:req.session.name, user:req.session.user});
}
var treatment = (req,res) => {
    res.render("Dentistry",{name:req.session.name, user:req.session.user});
}
var about = (req,res) => {
    res.render("about-us",{name:req.session.name, user:req.session.user});
}
var tvastraplus=(req,res) => {
    res.render("tvastra-plus",{name:req.session.name, user:req.session.user});
}
var query = (req,res) => {
    res.render("query",{name:req.session.name, user:req.session.user})
}
var faq = (req,res) => {
    res.render("FAQ",{name:req.session.name, user:req.session.user});
}
var contact = (req,res) => {
    res.render("contact",{name:req.session.name, user:req.session.user});
}
var abouthospital = (req,res) => {
    res.render("about-hospital",{name:req.session.name, user:req.session.user});
}

var doctorprofile = async (req,res) => {
    const doctoremail = req.params.demail;
    var docinfo = await docdetaildb.findOne({email:doctoremail});
    res.render("doctor-profile",{name:req.session.name, user:req.session.user, docinfo:docinfo});
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

const sortby=async(req,res)=>{
    var sort=req.body.sort.split("-");
    console.log("checking sort",sort);
    if(sort[0]=="name"){
      if(sort[1]=="asc"){
        var query={"name":1};
      }
      else if (sort[1] == "desc") {
        var query = { "name": -1 };
    }
    }
    if(sort[0]=="fees"){
      if(sort[1]=="asc"){
        var query={"fees":1};
      }
      else if (sort[1] == "desc") {
        var query = { "name": -1 };
    }
    }
  
  
    if(sort[0]=="experience"){
      if(sort[1]=="asc"){
        var query={"experience":1};
      }
      else if (sort[1] == "desc") {
        var query = { "experience": -1 };
    }
    }
    req.session.sortBy = query;
      
    return res.redirect("/doctor");
    
  }
  

const filter = async (req,res) => {
    const location = req.body.state;
    const hospitals = req.body.hospitals;
    const treatments = req.body.specialization;
    
    var filter=[];
    var locationlist = [];
    var hospitalslist = [];
    var treatmentslist = [];
    console.log(hospitalslist);
    if(location){
        if(typeof(location)=="string"){
            filter.push(location);
            locationlist.push(location);
        }
        else{
            for(var i=0;i<location.length;i++){
                filter.push(location[i]);
                locationlist.push(location[i])
            }
        }
    }
    if(hospitals){
        if(typeof(hospitals)=="string"){
            filter.push(hospitals);
            hospitalslist.push(hospitals);
        }
        else{
            for(var i=0;i<hospitals.length;i++){
                filter.push(hospitals[i]);
                hospitalslist.push(hospitals[i])
            }
        }
    }
    if(treatments){
        if(typeof(treatments)=="string"){
            filter.push(treatments);
            treatmentslist.push(treatments);
        }
        else{
            for(var i=0;i<treatments.length;i++){
                filter.push(treatments[i]);
                treatmentslist.push(treatments[i]);
            }
        }
    }

    var query = {
        "state":{$all: locationlist},
        "hospitals":{$all: hospitalslist},
        "specialization":{$all: treatmentslist}
    }

    if(locationlist.length==0){
        delete query.state;
    }

    if(hospitalslist.length==0){
        delete query.hospitals;
    }

    if(treatmentslist.length==0){
        delete query.specialization;
    }
    req.session.query=query;
    console.log("the query is",query);
    console.log(filter);
    req.session.filter = filter;
    res.redirect('/doctor');

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
    rescheduleget:rescheduleget,
    filter:filter,
    sortby:sortby
};