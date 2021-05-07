const { nextISSTimesForMyLocation } = require('./iss_promised');


const printPasses = arr => {
  for (const pass of arr) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
.then((passTimes) => {
  printPasses(passTimes);
})
.catch((error) => {
  console.log(`It didn't work: `, error.message);
});
