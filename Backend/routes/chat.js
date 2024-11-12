const express=require('express');
const message=require('../models/message');
const {sendmessage,getmessage}=require('../utils/chat');
const router=express.Router();

router.post('/send',async(req,res)=>{
    const {userid,message}=req.body;
    try
    {
        const newmessage=await sendmessage(userid,message);
        res.status(201).json(newmessage);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
});

router.get('/message',async(req,res)=>{
    try
    {
        const messages=await getmessage();
        res.status(200).json(messages);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

module.exports=router;