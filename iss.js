const request = require('request');

const fetchMyIP = callback => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });

};


const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates at IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    let dataObj = JSON.parse(body);
    const coordinates = {
      latitude: dataObj.latitude,
      longitude: dataObj.longitude
    };
    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = (coordinates, callback) => {
  request(`http://api.open-notify.org/iss/v1/?lat=${coordinates.latitude}&lon=${coordinates.longitude}&alt=1650`, (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching data at inputted latitude and longitude. Response: ${body}`), null);
      return;
    }

    let dataObj = JSON.parse(body);
    callback(null, dataObj.response);

  });
};


nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, data) => {
    if (error) {
      console.log('Error finding IP address');
      return callback(error, null);
    }
    fetchCoordsByIP(data, (error, data) => {
      if (error) {
        console.log('Error finding IP address');
        return callback(error, null);
      }
      fetchISSFlyOverTimes(data, (error, nextPasses) => {
        if (error) {
          console.log('Something did not work');
          return callback(error, null);
        };
        callback(null, nextPasses);
      })
    })
  })
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };