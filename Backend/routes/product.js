const express=require('express');
const product=require('../models/product');
const {addproduct,getallproduct}=require('../utils/product');
const router=express.Router();

router.get('/',async(req,res)=>{
    try
    {
        const products=await getallproduct();
        res.status(200).json(products);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

router.post('/add',async(req,res)=>{
    const {name,category,description,image,link}=req.body;
    try
    {
        const newproduct=await addproduct(name,category,description,image,link);
        res.status(201).json(newproduct);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
});

module.exports=router;