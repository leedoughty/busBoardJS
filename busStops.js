const axios = require("axios");
const apiCredentials = require("./apiCredentials");

const BASE_URL = "https://api.tfl.gov.uk";
const stopTypes = "NaptanPublicBusCoachTram";
const radius = 500;
const service = "/StopPoint";

const constructPath = (lat, lon) => {
  return `${BASE_URL}${service}?lat=${lat}&lon=${lon}&stoptypes=${stopTypes}&radius=${radius}&app_id=${apiCredentials.id}&app_key=${apiCredentials.key}`;
};

const getPostcodeData = (postcode) => {
  try {
    return axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

const getBusStopsData = (path) => {
  try {
    return axios.get(path);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

const getBusStops = (postcode) => {
  getPostcodeData(postcode)
    .then((response) => {
      const { latitude, longitude } = response.data.result;
      const path = constructPath(latitude, longitude);
      return getBusStopsData(path);
    })
    .then((response) => {
      response.data.stopPoints.forEach((busStop) => console.log(busStop.commonName));
    })
    .catch((error) => {
      console.log(error);
    });
};

getBusStops("nw51tl");
