const mongoose = require('mongoose');
const userdb = require('../models/user');

const signup = async (req,res,next) =>{
    const newUser = await userdb.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        dob:req.body.dob,
        phone:req.body.phone,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country
    });
    req.session.userId=newUser.id;
    req.session.user=newUser;
    req.session.errorType='Success';
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
module.exports={
    signup:signup,
    login:login,
    ensure:ensure
}