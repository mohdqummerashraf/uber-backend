const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
 const { registerValidation } = require('../validation/captain.validation');
 const captainController = require("../controllers/captain.controller")

router.post('/register',  registerValidation, captainController.registerCaptain)


module.exports = router;