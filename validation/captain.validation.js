const { body } = require("express-validator");

exports.registerValidation = [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullName.firstName').isLength({ min: 2 }).withMessage("First Name must be at least 2 characters long"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Vehicle color must be at least 3 characters long"),
    body('vehicle.plate').isLength({ min: 2 }).withMessage("Vehicle plate must be at least 2 characters long"),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage("Vehicle capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("Vehicle Type is invalid"),
];
