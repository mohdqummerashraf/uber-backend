const express = require('express');
const router = express.Router();

// Import individual route modules
const userRoute = require("./user.route");
const captainRoute = require("./captain.route");

// Mount the routes
router.use('/user', userRoute);        // Routes for user-related operations
router.use('/captain', captainRoute); // Routes for captain-related operations
 
// Default route for unhandled paths
router.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

module.exports = router;
