const request= require('request');

var getWeather= (lat, lon, callback)=> {
  request({
    url: `https://api.darksky.net/forecast/1dc415fdb01aa12281e9419383c90a42/${lat},${lon}`,
    json: true
  }, (error, response, body)=> {
    if (!error && response && body){
      callback(undefined, {
        currentTemperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    }
  })
};

module.exports= {
  getWeather
};
