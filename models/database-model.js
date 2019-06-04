var mongoose=require("mongoose");
module.exports=mongoose.model("User",{
    name: String,
    age:Number,
    nationality: String
});