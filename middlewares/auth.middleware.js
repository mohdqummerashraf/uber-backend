const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  try {
    // Retrieve token from cookies or authorization header
    const token =
      req.cookies.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    console.log("isBlacklisted", isBlacklisted)
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized: Token blacklisted" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    // Find user by ID from the decoded token
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "Unauthorized: User not found" });
    }

    console.log("user.....", user);
    req.user = user; // Attach user to the request object for downstream use
    next();
  } catch (error) {
    console.error("Error in authUser middleware:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
