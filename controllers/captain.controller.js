const captainService = require("../services/captain.service");
const captainModel = require("../models/captain.model.js");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
 const errors = validationResult(req);
 if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array()
    })
 }

 const {fullName, email, password, vehicle} = req.body;

 const isCaptainExist = await captainModel.findOne({email});
 
 if(isCaptainExist){
    return res.status(400).json({
        message: 'Captain Already Exist'
    })
 }

 const hashedPassword = await captainModel.hashPassword(password);

 const captain = await captainService.createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    password: hashedPassword,
    email,
    vehicleType: vehicle.vehicleType,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity
 });

 const token = captain.generateAuthToken();
 res.status(200).json({
    token, captain
 })

}
