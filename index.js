var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
var dbConfig = require("./config/database-config.js");
var services = require("./services/user-services.js")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static('public'));
app.set("view engine","pug");
app.set("views","./views")
mongoose.connect(dbConfig.url,{
    useNewUrlParser:true
}).then(() => {
    console.log("successfully connected to the database")
}).catch((err) => {
    console.log("Error in connecting database", err);
    process.exit();
});
app.get("/",function(req,res){
    res.render("person");    
})
app.post("/menu",function(req,res){
   services.checkUsers(req,res);
})
app.get("/viewFulllist",function(req,res){
    services.viewFulllist(req,res);
})
app.listen(3000,() => {
    console.log("server is running")
})