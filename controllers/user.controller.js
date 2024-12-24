const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.register = async (req, res, next) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Destructure request body
    const { fullname, email, password } = req.body;

    // Hash the password
    const hashedPassword = await userModel.hashPassword(password);

    // Create the user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = user.generateAuthToken();

    // Send a successful response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in register function:", error.message);
    res.status(500).json({
      message: "An error occurred while processing your request",
      error: error.message,
    });
  }
};

module.exports.login = async (req, res, next) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
  
      // Destructure request body
      const { email, password } = req.body;
  
      // Find the user by email and include the password field
      const user = await userModel.findOne({ email }).select("+password");
  
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await user.comparePassword(password);  // Called on the user instance
  
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
  
      // Generate a JWT token
      const token = user.generateAuthToken();
      res.cookie('token', token);
  
      res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      console.error("Error in login function:", error.message);
      res.status(500).json({
        message: "An error occurred while processing your request",
        error: error.message,
      });
    }
  };
  
module.exports.getUserProfile = async (req, res, next)=>{
  res.status(200).json(req.user);
}

module.exports.logoutUser = async(req, res, next)=>{
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await blacklistTokenModel.create({token})
  res.status(200).json({
    message: 'Logged Out'
  })
}