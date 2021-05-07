const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(`It didn't work!` , error);
//     return;
//   }
//   // console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('24.80.20.109', (error, data) => {
//   if (error) {
//     console.log('It did not work!', error);
//     return;
//   }
//   // console.log(`it worked! Returned coordinates:` , data);
  
// });

// fetchISSFlyOverTimes({ latitude: 43.6319, longitude: -79.3716 }, (error, data) => {
//   if (error) {
//     console.log('It did not work!', error);
//     return;
//   }
//   // console.log(`It worked! Returned stuff:`, data);
// });

const printPasses = arr => {
  for (const pass of arr) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log(`It didn't work!`, error);
  }

  printPasses(passTimes);
});