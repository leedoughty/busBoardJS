const axios = require("axios");
const apiCredentials = require("./apiCredentials");

const BASE_URL = "https://api.tfl.gov.uk";
const service = "/StopPoint";

const constructPath = (lat, lon) => {
  return `${BASE_URL}${service}?lat=${lat}&lon=${lon}&stoptypes=NaptanPublicBusCoachTram&radius=500&app_id=${apiCredentials.id}&app_key=${apiCredentials.key}`;
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
    console.error("first block", error);
    return Promise.reject(error);
  }
};

const getBusStops = (postcode) => {
  getPostcodeData(postcode)
    .then((response) => {
      const { longitude, latitude } = response.data.result;
      return { longitude, latitude };
    })
    .then((data) => {
      return constructPath(data.latitude, data.longitude);
    })
    .then((path) => {
      return getBusStopsData(path);
    })
    .then((response) => {
      response.data.stopPoints.forEach((el) => console.log(el.commonName));
    })
    .catch((error) => {
      console.log("second block", error);
    });
};

getBusStops("nw51tl");
