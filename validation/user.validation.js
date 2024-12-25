const { body } = require("express-validator");

exports.userValidation = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname.firstname")
    .isLength({ min: 2 })
    .withMessage("First name must have at least 2 characters"),
  body("fullname.lastname")
    .isLength({ min: 2 })
    .withMessage("Last name must have at least 2 characters"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 characters"),
];
