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
        event.preventDefault();
        city.value = '';
        currentDaySearch(cityName, APIKey);
        fiveDaySearch(cityName, APIKey)
    }
});


function renderCityList() {
    let previousCities = localStorage.getItem('cities');
    let cities = [];
    if (previousCities !== null && previousCities !== undefined) {
        cities = JSON.parse(previousCities);
    }
    cities = removeDuplicateCities(cities);

    cityList.innerHTML = '';
    cities.forEach(function(cityName) {
        let newLI = document.createElement('li');
        let cityBtn = document.createElement('button');
        cityBtn.setAttribute('id', 'cityInList');
        cityBtn.textContent = cityName;
        newLI.appendChild(cityBtn);
        cityList.appendChild(newLI);
        
    })
}

const displayCityName = document.querySelector('#cityName');
const temperature = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const humid = document.querySelector('#humid');


function currentDaySearch(city, key) {
    const searchedCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`

    fetch(searchedCity)
    .then(function(response) {
        if (!response.ok) {
            alert('Network response was not ok :(');
        }
        return response.json();
    })
    .then(function(data) {
        temperature.textContent = 'Temp: ';
        wind.textContent = 'Wind: ';
        humid.textContent = 'Humidity: ';

        let previousCities = localStorage.getItem('cities');
        let cities = [];
        if (previousCities !== null && previousCities !== undefined) {
            cities = JSON.parse(previousCities);
        }

        if (cities.includes(cityName)){

            displayCityName.textContent = data.name;
            temperature.textContent += data.main.temp + '°F';
            wind.textContent += data.wind.speed + ' MPH';
            humid.textContent += data.main.humidity + '%';
            
        } else{

        cityName = titleCase(city);
        cities.push(cityName);
        localStorage.setItem('cities', JSON.stringify(cities));

        let newLI = document.createElement('li');
        let cityBtn = document.createElement('button');
        cityBtn.setAttribute('id', 'cityInList');
        cityBtn.textContent = cityName;
        newLI.appendChild(cityBtn);
        cityList.appendChild(newLI);
        console.log(data);
        
        displayCityName.textContent = data.name;
        temperature.textContent += data.main.temp + '°F';
        wind.textContent += data.wind.speed + ' MPH';
        humid.textContent += data.main.humidity + '%';

        }

    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });
}

const forecastCards = document.querySelector('.forecastCards')

function fiveDaySearch(city, key) {
    const searchedCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`

    fetch(searchedCity)
    .then(function(response) {
        if (!response.ok) {
            alert('Network response was not ok :(');
        }
        return response.json();
    })
    .then(function(data) {
        forecastCards.innerHTML = '';

        const forecastData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

        forecastData.forEach(dayData => {
            const date = new Date(dayData.dt * 1000);
            const icon = dayData.weather[0].icon;
            const temperature = dayData.main.temp;
            const windSpeed = dayData.wind.speed;
            const humidity = dayData.main.humidity;

            const card = document.createElement('div');
            card.setAttribute('class', 'weatherCard');

            card.innerHTML = `
                <h4>${date.toDateString()}</h4>
                <img src="https://openweathermap.org/img/w/${icon}.png">
                <p>Temperature: ${temperature}°F</p>
                <p>Wind: ${windSpeed} MPH</p>
                <p>Humidity: ${humidity}%</p>
            `;

            forecastCards.appendChild(card);
        });
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function removeDuplicateCities(cities) {
    return cities.filter((item, index) => cities.indexOf(item) === index);
}


document.addEventListener('DOMContentLoaded', function() {
    renderCityList();

    cityList.addEventListener('click', function(event) {
        if (event.target && event.target.nodeName == 'BUTTON' && event.target.id == 'cityInList') {
            currentDaySearch(event.target.textContent, APIKey);
            fiveDaySearch(event.target.textContent, APIKey);
        }
    });
    
});
