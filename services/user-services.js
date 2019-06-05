var User=require("../models/database-model.js")
function checkUsers(req,res){
   var personInfo = req.body; //Get the parsed information
   console.log("req.body::",req.body);
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
   User.find({})
   .lean(true)
   .then((result)=>{
      var size=result.length;
      if(size%10===0)
         var lastPage=size/10;
      else
         var lastPage=parseInt(size/10)+1;
      if(parseInt(req.query.page)===lastPage){
         var buttonClass="btn btn-primary elem disabled";
      }
      else{
         var buttonClass="btn btn-primary elem";
      }
      if(parseInt(req.query.page)===1){
         var buttonClassFirst="btn btn-primary elem disabled";
      }
      else{
         var buttonClassFirst="btn btn-primary elem";
      }
      console.log("req.query::",req.query);
      var skip=((parseInt(req.query.page)-1)*10);
      console.log("SIZE::",size);
      console.log("skip::",skip);
      console.log("skip::",req.query.page);
      User.find({}).limit(parseInt(req.query.limit)).skip(parseInt(skip))
   .lean(true)
   .then((result) => {
      if(result.length > 0) {
         console.log("function called in full list :::::",(result.length));
         res.render('admin',  { users: result,pageCount:parseInt(req.query.page),size:size,lastPage:lastPage,buttonClass:buttonClass,buttonClassFirst:buttonClassFirst});
      }
   },(err) => {
      console.log('Error from fetching db : ', err);
      res.render('Error',  {msg: 'Error occured'});
   })
   },(err)=>{
      console.log('Error from fetching db : ', err);
      res.render('Error',  {msg: 'Error occured'});  
   })
}
module.exports = {
   checkUsers,
   viewFulllist
}