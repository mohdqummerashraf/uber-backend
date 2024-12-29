const express = require('express');
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const { authUser } = require('../middlewares/auth.middleware');

router.post('/create', authUser, rideController.createRide)

module.exports = router;