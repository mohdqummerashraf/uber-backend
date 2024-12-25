const express = require('express');
const router = express.Router();
const {body, validationResult}= require('express-validator');
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

router.post('/register', 
     
    userController.register
);

router.post('/login',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid Email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must have at least 6 characters'),
    ],
    
     userController.login);

router.get('/profile', auth.authUser, userController.getUserProfile);
router.get('/logout', auth.authUser, userController.logoutUser);


module.exports = router;