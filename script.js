'use strict';

const apiKey = "c0e52022c857a773ddd61e28d06baaa3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=42.0088692987344&lon=21.456035844396464&units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

checkWeather();