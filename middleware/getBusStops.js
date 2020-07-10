const busStops = require("../busStops");
const { getLocalLiveBuses } = require("../retrieveLocalBusStops");

const getBusStopsMiddleware = (request, response, next) => {
  const queryPostcode = request.query.postcode;
  busStops
    .getClosestBusStops(queryPostcode) // closestTwoBusStops, gets stop code for two closest bustops
    .then((data) => getLocalLiveBuses(data))
    .then((localFiveBusTimes) => response.send(localFiveBusTimes));
};

module.exports = {
  getBusStopsMiddleware,
};
