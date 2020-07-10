const busStops = require("../busStops");
const { getLocalLiveBuses } = require("../retrieveLocalBusStops");

const getBusStopsMiddleware = (request, response, next) => {
  const queryPostcode = request.query.postcode;
  busStops
    .getClosestBusStops(queryPostcode)
    .then((data) => getLocalLiveBuses(data))
    .then((localFiveBusTimes) => {
      response.json(localFiveBusTimes);
    });
};

module.exports = {
  getBusStopsMiddleware,
};
