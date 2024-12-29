const rideService = require("../services/ride.service");
const {validationResult} = require("express-validator");

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    const {userId, pickup, destination, vehicleType} = req.body;

    try {
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
        return res.status(200).json({
            success: true,
            message: 'Ride created successfully',
            data: ride
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}