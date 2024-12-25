const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({firstName, lastName, email, password, capacity, vehicleType, color,plate }) => {
    if(!firstName || !password || !email || !capacity || !vehicleType){
        throw new Error("All fields are required");
    }

    const captain = captainModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{
            color,
            capacity,
            vehicleType,
            plate
        }
    })
    return  captain;
}