const express=require('express');
const {login}=require('../utils/login');
const router=express.Router();

router.post('/login',async(req,res)=>{
    try
    {
        const {email,password}=req.body;
        const token=await login(email,password);
        res.status(200).json({token});
    }
    catch(error)
    {
        res.status(401).json({error:error.message});
    }
});

module.exports=router;