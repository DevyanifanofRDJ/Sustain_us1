const jwt=require('jsonwebtoken');
const user=require('../models/user');
const JWT_SECRET=process.env.JWT_SECRET;

async function login(email,password)
{
    const users=await user.findOne({email});
    if(!users)
    {
        throw new Error('Invalid Credentials');
    }
    const isMatch=await users.comparePassword(password);
    if(!isMatch)
    {
        throw new Error('Invalid password');
    }
    const token=jwt.sign({id:users._id},JWT_SECRET,{expiresIn:'1h'});
    return token;
}

module.exports={login};