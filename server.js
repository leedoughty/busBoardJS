const express = require("express");
const bodyParser = require("body-parser");
const getBusStops = require("./middleware/getBusStops");

const app = express();

app.use(express.json());

const port = 3000;

app.get("/", (request, response) => {
  response.send("Hello World Happy Days");
});

app.get("/departureBoards", getBusStops.getBusStopsMiddleware);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
