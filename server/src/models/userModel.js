const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstname:String,
    secondname:String,
    gmail:String,
    password:String 
})

const User=mongoose.model("BlogUser",userSchema)

module.exports=User