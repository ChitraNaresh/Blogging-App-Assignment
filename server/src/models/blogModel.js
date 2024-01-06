const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    imageUrl:String,
    title:String,
    description:String
})

const Blog=mongoose.model("AppBlogs",blogSchema)

module.exports=Blog