const express = require("express");
const app = express();
const router = express.Router();
const mainc=require("../controller/maincontroller");
const logc=require("../controller/logincontroller");
const userc=require("../controller/userprofile");
const docdetailc=require("../controller/docdetailsc");
const schedc=require("../controller/schedulecontroller");
const slotc=require("../controller/slotcontroller");
const adminc = require("../controller/admincontroller");
const path=require('path');
const multer = require('multer');
var Storage = multer.diskStorage({
    destination:'src/client/assets/uploads',
    filename:(req,file,cb) =>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage:Storage
});

router.route("/").get(mainc.login);
router.route("/").post(logc.login);
router.route("/phonelogin").get(mainc.phonelogin);
router.route("/phonelogin").post(logc.phonelogin);
router.route("/otp").get(mainc.otp);
router.route("/otp").post(logc.checkotp);
router.route("/resend-otp").put(logc.cancelotp);
router.route("/send-otp").post(logc.sendotp);
router.route("/verify-otp").post(logc.verotp);
router.route("/index").get(logc.ensure,mainc.index);
router.route("/signup").get(mainc.signup);
router.route("/signup").post(logc.signup);
router.route("/docdetail").get(mainc.docdetail);
router.route("/docdetail").post(upload.single('image'),docdetailc.updatedoc);
router.route("/profile").get(mainc.profile);
router.route("/profile").post(upload.single('image'),userc.update);
router.route("/add-schedule").get(schedc.getschedule);
router.route("/add-schedule").post(schedc.addschedule);
router.route("/settings").post(userc.passwordchange);
router.route("/appointments").get(schedc.showappointments);
router.route("/settings").get(mainc.settings);
router.route("/records").get(userc.showrecord);
router.route("/addrecords").post(upload.array('files',2),userc.addrecord);
router.route("/deleterecord/:recordid").post(userc.deleterecord);
router.route("/doctor").get(logc.ensure,mainc.doctor);
router.route("/hospital").get(logc.ensure,mainc.hospitals);
router.route("/Dentistry").get(logc.ensure,mainc.treatment);
router.route("/about-us").get(logc.ensure,mainc.about);
router.route("/tvastra-plus").get(logc.ensure,mainc.tvastraplus);
router.route("/query").get(logc.ensure,mainc.query);
router.route("/contact").get(logc.ensure,mainc.contact);
router.route("/FAQ").get(logc.ensure,mainc.faq);
router.route("/getschedule/:docid").get(slotc.getslots);
router.route("/getslots/:docid/:index").get(slotc.slotsp);
router.route("/disableslot/:scheduleid/:slotid").post(schedc.slotdel);
router.route("/disableallslots/:scheduleid").post(schedc.removeall);
router.route("/deleteschedule/:schedid").post(schedc.removeschedule);
router.route("/about-hospital").get(logc.ensure,mainc.abouthospital);
router.route("/doctor-profile").get(logc.ensure,mainc.doctorprofile);
router.route("/bookslot/:schedule_id/:did/:slot_id/:slot_time").post(slotc.slotclick);
router.route("/booking/:schedule_id").get(mainc.booking);
router.route("/booking/:schedule_id").post(slotc.confirmapp);
router.route("/confirmappointment").get(slotc.showconfirm);
router.route("/cancelapp/:schedule_id/:slot_id").post(slotc.deleteapp);
router.route("/rescheduleapp/:schedule_id/:did/:slot_id").post(slotc.reschedule);
router.route("/reschedule").get(mainc.rescheduleget).post(slotc.deleteapp);
router.route("/adminhome").get(adminc.adminhomeget);
router.route("/adminusers").get(adminc.adminusersget);
router.route("/admindoctors").get(adminc.admindoctorsget);
router.route("/adminhospitals").get(adminc.adminhospitalsget);
router.route("/adminedit/:useremail").get(adminc.adminusersprofileget);
router.route("/adminuserapp/:useremail").get(adminc.adminusersappget);
router.route("/adminuserreport/:useremail").get(adminc.adminuserreportsget);
router.route("/admindoctorsprofile/:doctorid").get(adminc.docadminprofileget);
router.route("/admindoctorsapp/:doctorid").get(adminc.docadminapp);
router.route("/adminhospedit/:hospitalid").get(adminc.adminhospdetget);
router.route("/adminprofile/:userid").post(upload.single('image'),adminc.adminprofiledetpost);
router.route("/admindocprofile/:doctorid").post(upload.single('image'),adminc.docadmindetpost);
router.route("/admincancelapp/:schedule_id/:slot_id/:useremail").post(adminc.deleteapp);
router.route("/hospdets/:hospitalid").post(upload.single('image'),adminc.edithospital);
router.route("/filter").post(mainc.filter);
module.exports=router;