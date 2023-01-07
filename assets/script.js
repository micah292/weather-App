var city = $('input[name="searchCity"]');
var searchBtn = $('.searchBtn');
var searchSectionEl = $('#searchSection');
var temp = $('.temp');
var humidty = $('.humidity');
var windSpeed = $('.wind');
var cityDisplay = $('#cityDisplay');
var searchedCity = [];
var storedCity = JSON.parse(localStorage.getItem('searchedCity'));
var APIKey = 'a0aca8a89948154a4182dcecc780b513';

function getWeather() {
    var latlanUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.val() + "&limit=1&appid=" + APIKey;
    fetch(latlanUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            function pullWeather() {
                var owUrl = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
                fetch(owUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                    });
            };
            pullWeather();
        });
};

function makeCityBtn() {
    var cityBtn = $('<button>');
    cityBtn.text(' ');
    for (var i = 0; i < searchedCity.length; i++) {
        var potatoe = JSON.parse(localStorage.getItem("searchedCity"));

        if (potatoe[i] !== null) {
            cityBtn.css('margin-top', '5px');
            cityBtn.text(potatoe[i]);
        }
        searchSectionEl.append(cityBtn);
    }

};

function saveCity() {
    if (storedCity === null) {
        searchedCity = searchedCity.concat(city.val());
        localStorage.setItem("searchedCity", JSON.stringify(searchedCity));
    } else {
        searchedCity = storedCity;
        searchedCity = searchedCity.concat(city.val());
        localStorage.setItem("searchedCity", JSON.stringify(searchedCity));
    };
};

function search() {
    saveCity();
    makeCityBtn();
    getWeather();
    cityDisplay.text(' ');
    cityDisplay.text(city.val());
};

searchBtn.on('click', search);