const user=require('../models/user');
const bcrypt=require('bcrypt.js');

async function register(username,email,password)
{
    const existinguser=await user.findOne({email});
    if(existinguser)
    {
        throw new Error('user already exists');
    }
    const newuser=new user({
        username,
        email,
        password
    });

    await newuser.save();
    return newuser;
}

module.exports={register};