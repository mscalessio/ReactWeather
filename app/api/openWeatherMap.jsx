var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/find?appid=e20287659dd3a0b9c5cd1cd26de72bcb&units=metric';

// e20287659dd3a0b9c5cd1cd26de72bcb

module.exports = {
  getTemp: function (location) {
    var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

    return axios.get(requestUrl).then(function (res) {
      if (res.data.cod !== 200 && res.data.message !== 'accurate') {
        throw new Error(res.data.message);
      } else {
        if (res.data.count === 0) {
          // console.log(res.data);
          throw new Error('No location found.');
        } else {
          // console.log(res.data);
          return res.data.list[0].main.temp;
        }
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  }
}
