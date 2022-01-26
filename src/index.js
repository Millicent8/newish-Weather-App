let now = new Date();

function formateTime() {
  let currentHour = document.querySelector("#current-Time");
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (hour < 10 && minutes < 10) {
    currentHour.innerHTML = `0${hour}:0${minutes}`;
  } else {
    currentHour.innerHTML = `${hour}:${minutes}`;
  }
}

formateTime();

function formateDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "September",
    "October",
    "November",
    "December"
  ];
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let currentDay = document.querySelector("#current-Date");
  currentDay.innerHTML = `${day} ${date} ${month} ${year}`;
}

formateDate();

function showCurrentTemperature(response) {
  document.querySelector("#current-City").innerHTML = response.data.name;

  let celciusMin = Math.round(response.data.main.temp_min);
  let weatherDescription = response.data.weather[0].description;

  let celciusTemperature = Math.round(response.data.main.temp);

  let iconElement = document.querySelector("#icon");
  let hudmidityElement = document.querySelector("#humidity");
  hudmidityElement.innerHTML = `Humidity:${Math.round(
    response.data.main.humidity
  )}`;
  let windElement = document.querySelector("#Wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}`;
  let replacmentTemperature = document.querySelector("#automatic-reading");
  replacmentTemperature.innerHTML = `${celciusTemperature}°C | ${celciusMin}°C`;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${weatherDescription}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
}

function search(city) {
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let defaultUnit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${defaultUnit}`;
  axios.get(`${apiUrl}`).then(showCurrentTemperature);
}

function isCity(event) {
  event.preventDefault();
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let defaultUnit = "metric";
  let location = document.querySelector("#new-City");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=${defaultUnit}`;
  axios.get(`${apiUrl}`).then(showCurrentTemperature);
}

function showFarenheitTemperature(response) {
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let celciusTemperature = Math.round(response.data.main.temp);
  let celciusMin = Math.round(response.data.main.temp_min);
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let farenheitMin = (celciusMin * 9) / 5 + 32;
  document.querySelector("#automatic-reading").innerHTML = `${Math.round(
    farenheitTemperature
  )}°F | ${Math.round(farenheitMin)}°F`;
}

function farenheit(event) {
  event.preventDefault();
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let unitF = "metric";
  let location = document.querySelector("#new-City");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=${unitF}`;
  axios.get(`${apiUrl}`).then(showFarenheitTemperature);
}

function showCelciusTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureMin = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#automatic-reading"
  ).innerHTML = `${temperature}°C | ${temperatureMin}°C`;
}
function isCelcius(event) {
  event.preventDefault();
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let unitC = "metric";
  let location = document.querySelector("#new-City");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=${unitC}`;
  axios.get(apiUrl).then(showCelciusTemperature);
}

function showLocationTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let tempMin = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#automatic-reading"
  ).innerHTML = `${temp}°C | ${tempMin}°C`;
}
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showLocationTemperature);
}

function isLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let celcuisTemperature = null;

let newCity = document.querySelector("#city-Search");
newCity.addEventListener("submit", isCity);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", farenheit);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", isCelcius);

let getCurrentTemp = document.querySelector("#Location");
getCurrentTemp.addEventListener("click", isLocation);

search("London");
