const express = require("express");
const app=express();
const router=express.Router();
const logger = require("morgan");
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const mid = require("./backend/routes/router")
const bodyParser = require("body-parser");
const session = require('express-session');
const connectDB=require("./backend/database/connection");
app.use(cors());
connectDB();
app.use(compression());
app.use(logger("dev"));
app.use(session({
    secret:'Tvastra',
    resave:false,
    saveUninitialized:false,
    
    cookie:{
        maxAge:1000 * 60 * 60 * 24,
        sameSite:true,
        secure:false
    }
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.set("views", __dirname+"/client/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "client")));
app.use("/",mid);
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
    console.log("application running in port ");
});

module.exports=app;