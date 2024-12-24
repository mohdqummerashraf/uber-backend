const userModel = require("../models/user.model");

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
  try {
    // Ensure required fields are provided
    if (!firstname || !email || !password) {
      throw new Error("All required fields must be provided");
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    // Create and save the user
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password, // Ensure this password is hashed before being passed
    });

    return user;
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};


