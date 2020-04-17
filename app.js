const yargs= require('yargs');

const geocode= require('./geocode/geocode.js');
const weather= require('./weather/weather.js')

const argv= yargs
  .option({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

geocode.geocodeAddress(argv.address, (errorMessage, result)=> {
  if (errorMessage){
    console.log(errorMessage);
  }
  else {
    console.log(`The address you entered was ${result.address}`);
    weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResult)=> {
      if (errorMessage){
        console.log(errorMessage);
      } else{
        console.log(`The current temperature is ${weatherResult.currentTemperature}, but it feels like ${weatherResult.apparentTemperature}.`);
      }
    })
  }
})
