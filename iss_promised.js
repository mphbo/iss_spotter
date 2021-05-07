const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`)
};

const fetchISSFlyOverTimes = (body) => {
  const data = JSON.parse(body);
  const coordinates = {
    latitude: data.latitude,
    longitude: data.longitude
  };
  return request(`http://api.open-notify.org/iss/v1/?lat=${coordinates.latitude}&lon=${coordinates.longitude}&alt=1650`)
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };