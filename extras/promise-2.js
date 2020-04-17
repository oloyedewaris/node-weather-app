const request = require('request');

var geocodeAddress= (address)=> {
  return new Promise((resolve, reject)=> {
    request({
      url: `https://us1.locationiq.com/v1/search.php?key=c8055c24ffce34&q=${encodeURIComponent(address)}&format=json`,
      json: true
    }, (error, response, body)=> {
      if (error) {
        reject('Unable to connect to server!');
      } else if (body.error=== 'Unable to geocode'){
        reject('Unable to find address!');
      } else if (body[0]){
        resolve({
          address: body[0].display_name,
          latitude: body[0].lat,
          longitude: body[0].lon
        })
      } else {
        console.log('Other errors occured');
      }
    })

  });

};

geocodeAddress('19146').then((location)=> {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage)=> {
  console.log(errormessage);
})
