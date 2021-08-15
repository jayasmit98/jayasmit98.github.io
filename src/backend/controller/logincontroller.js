const mongoose = require('mongoose');
const userdb = require('../models/user');
const Nexmo = require('nexmo');

const nexmo=new Nexmo({
    apiKey: '306bcc58', 
    apiSecret:'EfT1cIXutGptSDfH'
});

const signup = async (req,res,next) =>{
    req.body.isdoctor=Boolean(req.body.isdoctor);
    const newUser = await userdb.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        dob:req.body.dob,
        phone:req.body.phone,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        isdoctor:req.body.isdoctor
    });
    req.session.userId=newUser.id;
    req.session.user=newUser;
    req.session.errorType='Success';
    if(req.body.isdoctor){
        res.redirect('/docdetail')
    }
    res.redirect('/index');

}

const login = async (req,res,next) => {
    
    if(req.body.email && req.body.password){
        const user = await userdb.findOne({email:req.body.email});
        if(user){
            const corrpass = await req.body.password.localeCompare(user.password);
            if(corrpass===0){
                req.session.errorType='Success';
                req.session.error='Login Successfull'
                req.session.userId=user.id;
                req.session.user=user;
                req.session.name=user.name;
                req.session.email=user.email;
                req.session.image=user.image;
                res.redirect('/index');
            }
            else{
                req.session.error='Fail';
                req.session.errorType='Failure';
                res.redirect('/');
            }
        }
        else{
            req.session.error='Fail';
            req.session.errorType='Failure';
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }
  
}
const phonelogin= async (req,res,next)=>{
    if(req.body.phone){
        const user = await userdb.findOne({phone:req.body.phone});
        const nexmorequest = (err, result)=>{
            if(err){
                console.log(err);
                res.redirect("/phonelogin");
            }
            else{
                req.session.request_id=result.request_id;
                console.log('getting otp');
                console.log(req.session.request_id);
                req.session.user=user;
                req.session.error='Valid for 60 seconds';
                req.session.errorType='Note';
                res.redirect("/otp");
            }
        }
        if(user){
            
            nexmo.verify.request({
                number:'91'+req.body.phone,
                brand:'Tvastra',
                code_length:'4',
                workflow_id: '6',
                pin_expiry:'60',
            },nexmorequest);
        }
        else{
            req.session.errorType='Failure';
            req.session.error='Number not found';
            
            res.redirect("/phonelogin");
        }
    }
    else{
        res.redirect("/phonelogin");
    }
}
const checkotp = async (req,res,next) => {
    const nexmoverify = (err, result) =>{
        if(err){
            req.session.errorType='Failure';
            req.session.error='Please try again later';
            res.redirect("/otp")
        }
        else{
            if(result.error_text=='The code inserted does not match the expected value'){
                req.session.errorType='Failure';
                req.session.error='Incorrect OTP';
                res.redirect("/otp");
            }
            else{
                req.session.errorType='Success';
                req.session.error='Login Successfull';
                req.session.userId=req.session.user._id;
                req.session.user=req.session.user;
                req.session.request_id=null;
                req.session.save();
                console.log(req.session);
                res.redirect("/index");
            }
        }
    }
    const otp=`${req.body.otp1 + req.body.otp2 + req.body.otp3 + req.body.otp4}`;
    console.log(otp);
    if(otp.length===4){
        nexmo.verify.check({
            request_id:req.session.request_id,
            code:otp
        },nexmoverify)
    }
    else{
        res.redirect("/otp");
    }
}

const cancelotp = async (req,res,next) => {
    const resendotp=(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            const nexmorequest=(err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    req.session.request_id=result.request_id;
                    console.log('Getting otp');
                    req.session.error='Valid for 60 seconds';
                    req.session.errorType='Info';
                    res.redirect('/otp');
                }
            }
            nexmo.verify.request({
                number:'91'+req.session.user.phone,
                brand:'Tvastra',
                code_length:'4',
                workflow_id:'6',
                pin_expiry:'60'
            },nexmorequest);
        }
    }
    nexmo.verify.control({
        request_id:req.session.request_id,
        cmd:'cancel'
    },resendotp);
}

const ensure = (req,res,next) => {
    if(!req.session.userId){
        req.session.errorType="Failure";
        req.session.error="Please login first"
        res.redirect('/');
    }
    else{
        next();
    }
}

const sendotp =(req,res,next) => {
    const requestotp=(err,result)=>{
        if(err){
            res.status(400).json({
                status:'error',
                message:'Please come back later.'
            })
        }
        else{
            req.session.request_id=result.request_id;
            req.session.number=req.body.number;
            console.log('Requesting OTP');
            console.log(req.session.request_id);
            res.status(200).json({
                status:'success',
            })
        }
    }
    nexmo.verify.request({
        number:'91'+ req.body.number,
        brand:'Tvastra',
        code_length:'4',
        workflow_id:'6',
        pin_expiry:'120'
    },requestotp);
}

const verotp = (req,res,next) => {
    const nexmoverify = (err, result) =>{
        if(err){
            req.session.errorType='Failure';
            req.session.error='Please try again later';
            res.redirect("/otp")
        }
        else{
            if(result.error_text=='The code inserted does not match the expected value'){
                req.session.errorType='Failure';
                req.session.error='Incorrect OTP';
                res.redirect("/otp");
            }
            else{
                const user = userdb.findOne({email:req.session.user.email});
                user.phone=req.session.number;
                user.save();
                req.session.errorType='Success';
                req.session.request_id='null';
                req.session.save();
                res.redirect('/profile');
            }
        }
    }
    const otp=`${req.body.otp_1 + req.body.otp_2 + req.body.otp_3 + req.body.otp_4}`;
    console.log(otp);
    if(otp.length===4){
        nexmo.verify.check({
            request_id:req.session.request_id,
            code:otp
        },nexmoverify)
    }
}
module.exports={
    signup:signup,
    login:login,
    phonelogin:phonelogin,
    checkotp:checkotp,
    cancelotp:cancelotp,
    ensure:ensure,
    sendotp:sendotp,
    verotp:verotp
}