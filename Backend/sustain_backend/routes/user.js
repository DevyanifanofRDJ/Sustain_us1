const express=require('express');
const user=require('../models/user');
const jwt=require('jsonwebtoken');
const {verifyToken}=require('../middleware/auth');
const router=express.Router();

router.post('/register',async(req,res)=>{
    try
    {
        const {username,password}=req.body;
        const newuser=new user({username,password});
        await newuser.save();
        res.status(201).json({message:'User registered Sucessfully.'});
    }
    catch(error)
    {
        res.status(400).json({error:error.message});
    }
});

router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user=await user.findOne({username});
    if(!user||!(await user.comparePassword(password)))
    {
        return res.status(401).json({message:'Invalid credentials'});
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.status(200).json({token});
});

router.get('/protected',jwt.verifyToken,(req,res)=>{
    res.status(200).json({message:'Protected route accessed!'});
});

module.exports=router;