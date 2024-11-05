const express=require('express');
const carbon=require('../models/carbon');
const{verifyToken}=require('..middleware/auth');
const router=express.Router();

router.post('/',verifyToken,async(req,res)=>{
    try{
        const newRecord=new carbon({...req.body,user:req.userId});
        const savedRecord=await newRecord.save();
        res.status(201).json(savedRecord);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

router.get('/',verifyToken,async(req,res)=>{
    try{
        const records=await carbon.find({user:req.userId});
        res.status(200).json(records);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

module.exports=router;