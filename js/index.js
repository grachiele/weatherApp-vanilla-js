function onSubmit(e) {
  e.preventDefault();

  let zipcode = e.target.elements[0].value;
  const APIKEY = "1b3292d8476ca73faee1a365e843fbb1";

  let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&APPID=${APIKEY}&units=imperial`


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

function onSubmitCoords(e) {
  e.preventDefault();
  const APIKEY = "1b3292d8476ca73faee1a365e843fbb1";
  let position = navigator.geolocation.getCurrentPosition(function (pos){
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${APIKEY}&units=imperial`;
    fetch(weatherUrl)
        .then((res) => {
          return res.json()
        })
        .then((response) => {
          let fiveDay = getFiveDay(response);
          showWeather(fiveDay);
        });
  }, function (err) {
    alert("You need to have location services enabled!")
  });


  // let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&APPID=${APIKEY}&units=imperial`
  //
  //
  // if (zipcode === "") {
  //   alert("You need to enter a zipcode!")
  // } else {
  //   fetch(weatherUrl)
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((response) => {
  //       let fiveDay = getFiveDay(response);
  //       showWeather(fiveDay);
  //     });
  //   }
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
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let weatherArea = document.querySelector("#weather-area")
  let city = `<h1 id="current-city">${obj.city.name}</h1>`
  let fiveDayArr = obj.fiveDay
  let weatherStuff = fiveDayArr.map(day => {
    let date = day.dt_txt.split(" ")[0].split("-");
    let html = `<li class="weather-day"><div class="weather-stuff"><h3>${months[parseInt(date[1]- 1)] + " " + date[2] + ", " + date[0]}</h3><img class="weather-pic" src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" /><h6 class="description">${day.weather[0].description}</h6></div><ul class="temperature-list"><li class="temperatures">High: <span class="temperature">${parseInt(day.main.temp_max)} &#8457</span></li><li class="temperatures">Low: <span class="temperature">${parseInt(day.main.temp_min)} &#8457</span></li></ul></li>`;

  return html;
})
  weatherArea.innerHTML = city + `<div id="table"><ul id="five-day"></ul></div>`
  let weatherAreaUl = document.querySelector("#weather-area ul");
  weatherHTML = weatherStuff.join("");
  weatherAreaUl.innerHTML = weatherHTML
}
