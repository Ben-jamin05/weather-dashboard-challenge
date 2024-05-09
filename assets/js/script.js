const APIKey = 'be38cbf483d90b0adc3e0667ff616deb';
const city = document.querySelector('#citySearch');
const searchbtn = document.querySelector('#search-btn');
const cityList = document.querySelector('.cityList');

searchbtn.addEventListener('click', function (event) {
    let previousCities = localStorage.getItem('cities');
    let cities = [];
    if (previousCities !== null && previousCities !== undefined) {
        cities = JSON.parse(previousCities);
    }

    if (city.value.trim() === ''){
        window.alert("You must enter a city");
        event.preventDefault();
        return;
    } else if (cities.includes(city.value.trim())){
        window.alert("City already in already on the list. Click on the city name in the list.");
        event.preventDefault();
        city.value = '';
        return;
    } else {
        cities.push(city.value.trim());
        localStorage.setItem('cities', JSON.stringify(cities));
        console.log(cities);

        let newLI = document.createElement('li');
        newLI.setAttribute('id', 'cityInList');
        newLI.textContent = city.value.trim();
        cityList.appendChild(newLI);
        event.preventDefault();
        city.value = '';
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

document.addEventListener('DOMContentLoaded', function() {
    renderCityList();
});