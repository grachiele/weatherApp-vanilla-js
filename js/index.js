function onSubmit(e) {
  e.preventDefault();

  let zipcode = event.target.elements[0].value;
  const APIKEY = "1b3292d8476ca73faee1a365e843fbb1"
;

  let weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&APPID=${APIKEY}&units=imperial`


  if (zipcode === "") {
    alert("You need to enter a zipcode!")
  } else {
    let fiveDayWeather = fetch(weatherUrl)
      .then((res) => {
        return res.json()
      })
      .then((response) => {
        let forecast = response.list;
        let city = response.city

        let fiveDay = []

        for (index in forecast) {
          let weather = forecast[index];
          if (index === 0) {
            fiveDay.push(weather);
          }
          if (index % 8 === 0){
            fiveDay.push(weather);
          }
        }

        return fiveDay
      });
  }

  console.log(fiveDayWeather);
}
