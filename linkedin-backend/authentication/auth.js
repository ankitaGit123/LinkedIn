const jwt = require("jsonwebtoken");
const User = require('../models/user');


exports.auth = async (req,res,next) =>{
    try{
        const token = req.cookies.token;
        console.log(token);
        if(!token){
            console.log(token);
            return res.status(401).json({ error: 'No token, authorization denied' })
        }
        console.log(process.env.JWT_PRIVATE_KEY, "<- token");
        const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = await User.findById(decoded.userId).select('-password');
        next();

    }catch(error){
        res.status(401).json({ error: 'Token is not valid'})
    }
}