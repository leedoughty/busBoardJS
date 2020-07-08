const axios = require("axios");
const apiCredentials = require("./apiCredentials");

const BASE_URL = "https://api.tfl.gov.uk";
const service = "/StopPoint";

const constructPath = () => {
  return `${BASE_URL}${service}?lat=51.553935&lon=-0.144754&stoptypes=NaptanPublicBusCoachTram&radius=500&app_id=${apiCredentials.id}&app_key=${apiCredentials.key}`;
};

const getBusStopsData = () => {
  const path = constructPath();
  try {
    return axios.get(path);
  } catch (error) {
    console.error("first block", error);
    return Promise.reject(error);
  }
};

const getBusStops = () => {
  getBusStopsData()
    .then((response) => {
      response.data.stopPoints.forEach((el) => console.log(el.commonName));
    })
    .catch((error) => {
      console.log("second block", error);
    });
};

getBusStops();
