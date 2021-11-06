let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Fri",
  "Saturday",
];
let now = new Date();
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let hour = now.getHours();
let minutes = now.getMinutes();

let date = document.querySelector("#date");

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let h = addZero(hour);
let min = addZero(minutes);
let time = h + ":" + min;

date.innerHTML = `${day} ${month} ${time}`;

let form = document.querySelector("#search-submit");
let h1 = document.querySelector("h1");
let searchCity = document.querySelector("#search_input");
let temperature = document.querySelector(".temperature");

function search(city) {
  let apiKey = "512bbbf4dd2812df6bfbfa05efb65bf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function displayCity(event) {
  event.preventDefault();
  h1.innerHTML = searchCity.value;
  let city = searchCity.value;
  search(city);
}
form.addEventListener("submit", displayCity);

function searchLocation(position) {
  let apiKey = "512bbbf4dd2812df6bfbfa05efb65bf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
}

function displayTemp(response) {
  h1.innerHTML = response.data.name;
  let temperatureValue = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temperatureValue}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function showWeatherCurrent(response) {
  let temperatureCurrentValue = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temperatureCurrentValue}`;
}

search("Abuja"); // search onload to display a city

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

navigator.geolocation.getCurrentPosition(searchLocation);
