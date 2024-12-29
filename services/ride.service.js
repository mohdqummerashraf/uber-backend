const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto= require('crypto');

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 18,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 7,
    motorcycle: 8,
  };
  const perMinuteRate = {
    auto: 2,
    car: 5,
    motorcycle: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        distanceTime.duration.value / 60 / perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        distanceTime.duration.value / 60 / perMinuteRate.car
    ),
    bike: Math.round(
      baseFare.bike +
        (distanceTime.distance.value / 1000) * perKmRate.bike +
        distanceTime.duration.value / 60 / perMinuteRate.bike
    ),
  };

  return fare;
}

function getOTP (num){
    function generateOTP(num) {
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOTP(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(6),
    fare: fare[vehicleType],
  });

  return ride;
};
