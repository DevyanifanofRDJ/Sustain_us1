const jwt=require('jsonwebtoken');

const secret_key=process.env.JWT_SECRET;

function verifyToken(req,res,next)
{
    const token=req.headers['authorization'];
    if(!token)
    {
        return res.status(401).json({message:'Acess denied. No token Provided.'});
    }
    try
    {
        const decoded=jwt.verify(token,secret_key);
        req.userId=decoded.id;
        next();
    }
    catch(error)
    {
        res.status(400).json({message:'Invalid token.'});
    }
}

module.exports={verifyToken};