const express = require('express');
const router = express.Router();

// Import individual route modules
const userRoute = require("./user.route");
const captainRoute = require("./captain.route");
const mapRoute = require("./maps.route");
const rideRoute = require("./ride.route");

// Mount the routes
router.use('/user', userRoute);        // Routes for user-related operations
router.use('/captain', captainRoute); // Routes for captain-related operations
router.use('/map', mapRoute); // Routes for map-related operations
router.use('/ride', rideRoute); // Routes for map-related operations
 
// Default route for unhandled paths
router.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

module.exports = router;
