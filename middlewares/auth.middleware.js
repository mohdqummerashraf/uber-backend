const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async(req, res, next)=>{
    const token = req.cookies.token || req.headers?.authorization.split(' ')[1];
     if(!token){
        return res.staus(401).json({message: 'Unauthorized'});
    }

    const isBlacklisted = await userModel.findOne({
        token: token
    });

    if(!isBlacklisted){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded)
        const user = await userModel.findById(decoded._id);
        console.log("user.....", user);
        req.user = user;
        return next();
        
    } catch (error) {
        console.log('errrrrrrr', error.message)
        return res.status(401).json({message: 'Unauthorized'});

    }
}