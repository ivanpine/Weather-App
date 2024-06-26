'use strict';

const searchInput = document.querySelector('.city-search__input');
const searchButton = document.querySelector('.search__button');
const form = document.querySelector('form');
const cityName = document.querySelector('.city');
const cityTemperature = document.querySelector('.weather-temperature');
const weatherDesc = document.querySelector('.weather-description');
const humidity = document.querySelector('.row-1_value');
const wind = document.querySelector('.row-2_value');
const feelsLike = document.querySelector('.row-3_value');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const icon = document.querySelector('.weather-icon');
const card = document.querySelector('.card-left');

const weatherIcons = {
    "Clear": "images/clear.png",
    "Sunny": "images/clear.png",
    "Cloudy": "images/clouds.png",
    "Overcast": "images/clouds.png",
    "Partly cloudy": "images/mist.png",
    "Moderate rain": "images/drizzle.png",
    "Light rain": "images/drizzle.png",
    "Heavy rain": "images/rain.png",
    "Moderate snow": "images/snow.png",
    "Heavy snow": "images/snow.png",
};

async function checkWeather(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6016ca3d7b8340d7aff135730240506&q=${city}&aqi=no`);
    const data = await response.json();

    const lat = data.location.lat;
    const lon = data.location.lon;

    const response2 = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}`);
    const data2 = await response2.json();

    console.log(data);
    console.log(data2);

    cityName.innerHTML = data.location.name;
    cityTemperature.innerHTML = Math.round(data.current.temp_c) + '°C';
    weatherDesc.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + '%';
    wind.innerHTML = Math.round(data.current.wind_kph) + 'km/h';
    feelsLike.innerHTML = Math.round(data.current.feelslike_c) + '°C';

    const sunriseTime = data2.results.sunrise;
    const [hour, minute] = sunriseTime.split(':');
    const formattedTime = hour.padStart(2, '0') + ':' + minute + ' AM';
    sunrise.innerHTML = formattedTime;

    const sunsetTime = data2.results.sunset;
    const [hour2, minute2] = sunsetTime.split(':');
    const formattedTime2 = hour2.padStart(2, '0') + ':' + minute2 + ' PM';
    sunset.innerHTML = formattedTime2;
    
    const condition = data.current.condition.text;

    if (data.current.is_day) {
        icon.src = weatherIcons[condition];
    }

    else {
        if (condition === "Clear") {
            icon.src = "images/crescent-moon.png";
        }

        card.style.background = "linear-gradient(#442B65 25%, #FBB431 100%)";
    }
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6016ca3d7b8340d7aff135730240506&q=${lat},${lon}&aqi=no`);
    const data = await response.json();
    
    checkWeather(data.location.name);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkWeather(searchInput.value);
    searchInput.value = '';
});

window.onload = getLocation;