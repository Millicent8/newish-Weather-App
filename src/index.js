let now = new Date();

function formateTime() {
  let currentHour = document.querySelector("#current-Time");
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (hour > 10 && minutes > 10) {
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
 <div class="col-3">
   <div class="card">
     <ul class="list-group list-group-flush">
       <li class="list-group-item line-1">${Math.round(
         forecastDay.temp.max
       )}°C <strong>| ${Math.round(forecastDay.temp.min)}°C</strong></li>
       <li class="list-group-item line-2">${formatDay(forecastDay.dt)}</li>
       <li class="list-group-item line-3">
         <img id="forecast-icon" src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png" alt="icon">
       </li>
     </ul>
   </div>
 </div>
 </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let urlKey = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(urlKey).then(showForecast);
}

function showCurrentTemperature(response) {
  let celciusMin = Math.round(response.data.main.temp_min);
  let weatherDescription = response.data.weather[0].description;
  let celciusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#current-City").innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  let hudmidityElement = document.querySelector("#humidity");
  hudmidityElement.innerHTML = `Humidity:${Math.round(
    response.data.main.humidity
  )}°`;
  let windElement = document.querySelector("#Wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
  let replacmentTemperature = document.querySelector("#automatic-reading");
  replacmentTemperature.innerHTML = ` ${celciusTemperature}°C | ${celciusMin}°C`;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${weatherDescription}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  getForecast(response.data.coord);
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

let newCity = document.querySelector("#city-Search");
newCity.addEventListener("submit", isCity);

let getCurrentTemp = document.querySelector("#Location");
getCurrentTemp.addEventListener("click", isLocation);

search("London");
