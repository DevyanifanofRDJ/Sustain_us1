const express=require('express');
const carbon=require('../models/carbon');
const calculate=require('../utils/carbon');
const{verifyToken}=require('../middleware/auth');
const router=express.Router();

router.post('/',verifyToken,async(req,res)=>{
    try
    {
        const {miles,energy,efficiency}=req.body;
        const total=calculate(miles,energy,efficiency);
        const newRecord=new carbon({
            user:req.userId,
            miles,
            energy,
            efficiency
        });
        const savedRecord=await newRecord.save();
        res.status(201).json(savedRecord);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

router.get('/',verifyToken,async(req,res)=>{
    try
    {
        const records=await carbon.find({user:req.userId});
        res.status(200).json(records);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

module.exports=router;