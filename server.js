const express = require('express');
const busStops = require('./busStops')
const app = express();

const port = 3000;

app.get('/', (request, response) => {
    response.send("Hello World Happy Days")
})

app.get('/departureBoards', (request, response) => {
    const queryPostcode = request.query.postcode;
    busStops.getBusStops(queryPostcode)
        .then((data) => response.status(200).send(data))
})

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});