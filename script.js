'use strict';

const apiKey = "c0e52022c857a773ddd61e28d06baaa3";
const searchInput = document.querySelector('.city-search__input');
const searchButton = document.querySelector('.search__button');
const form = document.querySelector('form');

const cityName = document.querySelector('.city');
const cityTemperature = document.querySelector('.weather-temperature');
const weatherDesc = document.querySelector('.weather-description');

async function checkWeather(city) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
    const data = await response.json();

    const lat = data[0].lat;
    const lon = data[0].lon;

    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data2 = await response2.json();

    console.log(data2);

    cityName.innerHTML = city;
    cityTemperature.innerHTML = Math.round(data2.main.temp) + '°C';
    weatherDesc.innerHTML = data2.weather[0].main;

};

form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkWeather(searchInput.value);
    searchInput.value = '';
});