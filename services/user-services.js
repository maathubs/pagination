var User=require("../models/database-model.js")
function checkUsers(req,res){
   var personInfo = req.body; //Get the parsed information
   // console.log("req.body::",req.body);
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
      message: "Sorry, you provided worng info", type: "error"});
      console.log(personInfo.name,personInfo.age,personInfo.nationality)
   } 
   else {
      var newPerson = new User({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });   
      newPerson.save(function(err, userData){
         if(err)
            res.render('menu', {message: "Database error", type: "error"});
         else
            console.log("USERDATA:",userData);
         User.find({}).sort({"name":1})
         .lean(true)
         .then((result) => {
            console.log('result from db: ', result);
            if(result.length > 0) {
               res.render('menu',  {person: personInfo, users: result});
            }
         },(err) => {
            console.log('Error from fetching db : ', err);
            res.render('Error',  {msg: 'Error occured'});
         })
      });
   }
}
function viewFulllist(req,res){
   User.find({}).sort({"name":1}).limit(10)
   .lean(true)
   .then((result) => {
      console.log('result from db: ', result);
      if(result.length > 0) {
         console.log("function called in full list :::::",(result.length));
         res.render('admin',  { users: result,text :1});
      }
   },(err) => {
      console.log('Error from fetching db : ', err);
      res.render('Error',  {msg: 'Error occured'});
   })
}
function listFirst(req,res){
   User.find({}).limit(10)
   .lean(true)
   .then((result)=>{
      console.log('result from db: ', result);
      if(result.length > 0) {
         var text=1;
         console.log("function called in listFirst:::::",(result.length));
         res.render('admin',  { users: result,text: text});
      }
   },(err) => {
      console.log('Error from fetching db : ', err);
      res.render('Error',  {msg: 'Error occured'});
   })
}
function listSecondfirst(req,res){
   User.find({}).skip(10).limit(10)
   .lean(true)
   .then((result)=>{
      console.log('result from db: ', result);
      if(result.length > 0) {
         var text=2;
         console.log("function called in in listFirst:::::",(result.length));
         res.render('admin',  { users: result,text: text});
      }
   },(err) => {
      console.log('Error from fetching db : ', err);
      res.render('Error',  {msg: 'Error occured'});
   })
}
function listSecondlast(req,res){
   User.find({})
   .lean(true)
   .then((result)=>{
      console.log('result from db in listLast: ', result);
      if(result.length > 0) {
         var totalLength=result.length;
         if(totalLength%10===0)
         var text=totalLength/10;
         else
         var text=parseInt(totalLength/10);
         var viewSize=totalLength-(parseInt(totalLength/10)*10);
         var total=totalLength-viewSize;
         console.log("length::",totalLength);
         console.log("viewSize::",viewSize);
         console.log("total::",total); 
         console.log("function called:::::",(result.length));
         User.find({}).skip(total)
         .lean(true)
         .then((result)=>{
            if(result.length>0)
            res.render('admin',  { users: result,text: text});
         })
      }
   },(err) => {
      console.log('Error from fetching db : ', err);
      res.render('Error',  {msg: 'Error occured'});
   })
}
function listLast(req,res){
   User.find({})
   .lean(true)
   .then((result)=>{
      console.log('result from db in listLast: ', result);
      if(result.length > 0) {
         var totalLength=result.length;
         if(totalLength%10===0)
         var text=totalLength/10;
         else
         var text=parseInt(totalLength/10)+1;
         var viewSize=totalLength-(parseInt(totalLength/10)*10);
         var total=totalLength-viewSize;
         console.log("length::",totalLength);
         console.log("viewSize::",viewSize);
         console.log("total::",total);
         console.log("function called:::::",(result.length));
         User.find({}).skip(total)
         .lean(true)
         .then((result)=>{
            if(result.length>0)
            res.render('admin',  { users: result,text: text});
         })
      }
   },(err) => {
      console.log('Error from fetching db : ', err);
      res.render('Error',  {msg: 'Error occured'});
   })
}
module.exports = {
   checkUsers,
   viewFulllist,
   listFirst,
   listLast,
   listSecondfirst,
   listSecondlast
}