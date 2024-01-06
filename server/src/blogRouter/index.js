const express = require("express");
const Blog = require("../models/blogModel");
const middlewareJwt=require("../middlewares/middleware")
const router = express.Router();

router.get("/all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      message: blogs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while creating blog",
      success: false,
    });
  }
});

router.get("/get-blog/:_id",async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params._id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error while creating blog",
          success: false,
        });
      }
},[])

router.post("/create-blog",middlewareJwt, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(200).json({
      message: "Blog created successfully",
      success: true,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "Error while creating post",
      success: false,
    });
  }
});

router.put("/update-blog/:_id",middlewareJwt, async(req, res) => {
    console.log(req.params)
  try{
     const updatedBlog=await Blog.findByIdAndUpdate(req.params._id, req.body, { new: true })
     if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.status(200).json({
        message: "Blog updated",
        success: true,
      })
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "Error while updating post",
      success: false,
    });
  }
});

router.delete("/delete-blog/:_id",middlewareJwt, async(req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params._id);
        if (!deletedBlog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({message:"Blog deleted"});
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;
