const APIKey = 'be38cbf483d90b0adc3e0667ff616deb';
const city = document.querySelector('#citySearch');
const searchbtn = document.querySelector('#search-btn');
const cityList = document.querySelector('.cityList');

function titleCase(city) {
    city = city.toLowerCase().split(' ');
    for (var i = 0; i < city.length; i++) {
        city[i] = city[i].charAt(0).toUpperCase() + city[i].slice(1); 
    }
    return city.join(' ');
  }

searchbtn.addEventListener('click', function (event) {
    let previousCities = localStorage.getItem('cities');
    let cities = [];
    if (previousCities !== null && previousCities !== undefined) {
        cities = JSON.parse(previousCities);
    }

    cityName = titleCase(city.value.trim());

    if (cityName === ''){
        window.alert("You must enter a city");
        event.preventDefault();
        return;
    } else if (cities.includes(cityName)){
        window.alert("City already in already on the list. Click on the city name in the list.");
        event.preventDefault();
        city.value = '';
        return;
    } else {
        cities.push(cityName);
        localStorage.setItem('cities', JSON.stringify(cities));
        console.log(cities);

        let newLI = document.createElement('li');
        newLI.setAttribute('id', 'cityInList');
        newLI.textContent = cityName;
        cityList.appendChild(newLI);
        event.preventDefault();
        city.value = '';
        searchCity(cityName, APIKey);
    }
});

function renderCityList() {
    let previousCities = localStorage.getItem('cities');
    let cities = [];
    if (previousCities !== null && previousCities !== undefined) {
        cities = JSON.parse(previousCities);
    }
    cityList.innerHTML = '';
    cities.forEach(function(cityName) {
        let newLI = document.createElement('li');
        newLI.setAttribute('id', 'cityInList');
        newLI.textContent = cityName;
        cityList.appendChild(newLI);
    })
}

const displayCityName = document.querySelector('#cityName');
const temp = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const humid = document.querySelector('#humid');


function searchCity(city, key) {
    const searchedCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`

    fetch(searchedCity)
    .then(function(response) {
        if (!response.ok) {
            alert('Network response was not ok :(');
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        //localStorage.setItem('weatherData', JSON.stringify(data));
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    renderCityList();
});