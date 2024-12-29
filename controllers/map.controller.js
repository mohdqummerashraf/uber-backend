const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req.query.address);
   if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array()
    });
  }
  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinates(address);
     res.status(200).json(coordinates);
  } catch (error) {
    console.log("eerorror", error.message)
    res.status(404).json({ message: "Internal Server Error" });
  }
};
module.exports.getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array()
    });
  }
  const { origin, destination } = req.query;

  try {
    const coordinates = await mapService.getDistanceTime(origin, destination);
     res.status(200).json(coordinates);
  } catch (error) {
    console.log("eerorror", error.message)
    res.status(404).json({ message: "Internal Server Error" });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array()
    });
  }
  const {input } = req.query;

  try {
    const coordinates = await mapService.getSuggestions(input);
     res.status(200).json(coordinates);
  } catch (error) {
    console.log("eerorror", error.message)
    res.status(404).json({ message: "Internal Server Error" });
  }
};
