const express = require("express");
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const router = express.Router();
const User = require("../models/userModel");

router.post("/signup",async(req,res)=>{
    const {firstname,secondname,gmail,password}=req.body
    console.log(req.body,100)

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
        firstname,
        secondname,
        gmail,
        password: hashedPassword,
      });

      newUser.save().then(()=>{
        return res.status(200).json({"message":"User registration successfull.."})
      }).catch(err=>{
        console.log(err.message)
      })
})

// signin

router.post('/signin', async (req, res) => {
    const { gmail, password } = req.body;
  
    const user = await User.findOne({ gmail });
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid gmail' });
    }
  
    const passwordMatch = await bcryptjs.compare(password, user.password);
  
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  
    const token = jwt.sign({ firstname: user.username,secondname:user.secondname }, process.env.JWT_SECRET);
  
    res.json({ token });
  
})

module.exports = router;