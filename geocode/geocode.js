const request= require('request');

const darkskykey= '1dc415fdb01aa12281e9419383c90a42';
const locationiqkey= 'c8055c24ffce34';

var geocodeAddress= (address, callback)=> {

var encodedAddress= encodeURIComponent(address);

  request({
    url: `https://us1.locationiq.com/v1/search.php?key=c8055c24ffce34&q=${encodedAddress}&format=json`,
    json: true
  }, (error, response, body)=> {
    if (error) {
      callback('Unable to connect to server!');
    } else if (body.error=== 'Unable to geocode'){
      callback('Unable to find address!');
    } else if (body[0]){
      callback(undefined, {
        address: body[0].display_name,
        latitude: body[0].lat,
        longitude: body[0].lon
      })
    } else {
      console.log('Other errors occured');
    }
  })

};

module.exports= {
  geocodeAddress
}
