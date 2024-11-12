const chat=require('../models/chat');

async function sendmessage(userid,message) 
{
    const newmessage=new chat({
        user:userid,
        message
    });
    await newmessage.save();
    return newmessage;
}

async function getmessage()
{
    const messages=await chat.find().populate('user','username');
    return messages;
}

module.exports={sendmessage,getmessage};