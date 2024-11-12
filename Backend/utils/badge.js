const badge=require('../models/badge');
const userbadge=require('../models/userbadge');
const user=require('../models/user');
const badge = require('../models/badge');

async function assignbadge(userid,progress)
{
    const badgecriteria={
        'Eco Warrior':{progress:10},
        'Carbon Champion':{progress:20},
        'Green Gardian':{progress:40}
    };

    for(let badgename in badgecriteria)
    {
        const badge=await badge.findOne({name:badgename});
        if(progress>=badgecriteria[badgename].progress)
        {
            const existingbadge=await userbadge.findOne({user:userid,badge:badge._id});
            if(!existingbadge)
            {
                const newbadge=new userbadge({
                    user:userid,
                    badge:badge._id,
                    progress
                });
                await newbadge.save();
            }
        }
    }
}

async function getbadge(userid)
{
    const userbadges=await userbadge.find({user:userid}).populate('badge');
    return userbadges;
}

async function updatecarbonfoot(userid,newprogress)
{
    const {userid,newprogress}=req.body;
    try
    {
        if(newprogress==null||newprogress<0)
            return res.status(400).json({error:'Invalid progress value'});
        await assignbadge(userid,newprogress);
        res.status(200).json({message:'badge assigned based on progress'});
    }
    catch(error)
    {
        res.statuc(500).json({error:error.message});
    }
}

async function showbadge(userid)
{
    const{userid}=req.params;
    try
    {
        const badges=await getbadge(userid);
        res.status(200).json({badges});
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}

module.exports={assignbadge,updatecarbonfoot,getbadge,showbadge};



