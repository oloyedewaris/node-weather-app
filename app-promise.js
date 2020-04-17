const yargs= require('yargs');
const axios= require('axios');

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

var encodedAddress= encodeURIComponent(argv.address);
var geocodeUrl= `https://us1.locationiq.com/v1/search.php?key=c8055c24ffce34&q=${encodedAddress}&format=json`

axios.get(geocodeUrl).then((response)=> {
  if (response.data.error=== 'Unable to goecode') {
    throw new Error('Unable to find that address');
  }
  var lat= response.data[0].lat;
  var lon= response.data[0].lat;
  var enteredAddress= response.data[0].display_name;
  var weatherUrl= `https://api.darksky.net/forecast/1dc415fdb01aa12281e9419383c90a42/${lat},${lon}`
  console.log(`The address you entered is ${enteredAddress}`);
  return axios.get(weatherUrl);
}).then((response)=> {
  var currentTemperature= response.data.currently.temperature
  var apparentTemperature= response.data.currently.apparentlyTemperature
  console.log(`The current temperature ${currentTemperature}, but it feels like ${apparentTemperature}`)
}).catch((e)=> {
  if (e.message=== 'getaddrinfo ENOTFOUND us1.locationiq.com'){
    console.log('Unable to connect to api server');
  } else {
    console.log('Other errors occured');
  }
})
