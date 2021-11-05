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
let apiKey = "512bbbf4dd2812df6bfbfa05efb65bf4";

function displayCity(event) {
  event.preventDefault();
  h1.innerHTML = searchCity.value;
  let city = searchCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
form.addEventListener("submit", displayCity);

// weather api functions
function displayTemp(response) {
  h1.innerHTML = response.data.name; // always good to use the name the api is giving you back
  let temperatureValue = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temperatureValue}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function showWeatherCurrent(response) {
  let temperatureCurrentValue = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temperatureCurrentValue}`;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeatherCurrent);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
