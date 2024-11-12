const express=require('express');
const {
    updatecarbonfoot,
    showbadge,
}=require('../utils/badge');
const router=express.Router();

router.post('/update-footprint',updatecarbonfoot);

router.get('/user/:userid/badges',showbadge);

module.exports=router;