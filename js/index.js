function onSubmit(e) {
  e.preventDefault();

  let zipcode = e.target.elements[0].value;
  const APIKEY = "1b3292d8476ca73faee1a365e843fbb1"
;

  let weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&APPID=${APIKEY}&units=imperial`


  if (zipcode === "") {
    alert("You need to enter a zipcode!")
  } else {
    fetch(weatherUrl)
      .then((res) => {
        return res.json()
      })
      .then((response) => {
        let fiveDay = getFiveDay(response);
        showWeather(fiveDay);
      });
    }
}

function getFiveDay(obj) {
  let forecast = obj.list;
  let city = obj.city

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

  let newObj = {
    city,
    fiveDay
  }

  return newObj
}

function showWeather(obj) {
  console.log(obj);
  let weatherArea = document.querySelector("#weather-area");
  let city = `<h1 id="current-city">${obj.city}</h1>`
}
