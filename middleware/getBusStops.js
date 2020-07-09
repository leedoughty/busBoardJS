const busStops = require('../busStops')

const getBusStopsMiddleware = (request, response, next) => {
    const queryPostcode = request.query.postcode;
    busStops.getBusStops(queryPostcode)
        .then((data) => response.status(200).send(data))
}

module.exports = {
    getBusStopsMiddleware
}