const axios = require("axios");
const apiCredentials = require("./apiCredentials");

const BASE_URL = "https://api.tfl.gov.uk";
const service = "/StopPoint";
const stopCode = "/490008660N";
const endpoint = `${BASE_URL}${service}${stopCode}/Arrivals?app_id=${apiCredentials.id}&app_key=${apiCredentials.key}`;

const getLiveTimes = () => {
  try {
    return axios.get(endpoint);
  } catch (error) {
    console.error(error);
  }
};

const getBuses = () => {
  getLiveTimes()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

getBuses();
