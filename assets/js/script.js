var apiKey = "e4edabe0cf965862c45bd6d4d7037770";
var city;
var searchEl = document.querySelector("#search-form");
var citySearchEl = document.querySelector("#city-search");

//City, Current data and Forecast
function getCity(cityName){
    var geoLocationURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`
    console.log(geoLocationURL);
    fetch(geoLocationURL)
    .then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data);
        var todayWeather = data.list[0];
        document.querySelector("#current-temp").textContent = todayWeather.main.temp_max+"F";
        document.querySelector("#current-humidity").textContent = todayWeather.main.humidity+"%";
        document.querySelector("#current-wind").textContent = todayWeather.wind.speed+"mph";
        //Build a for loop 
        for (var i = 0; i < 5; i++) {
            var index = i * 8 + 5;
        }
    });
};

//The $ before the {} creates template literal variables
//var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

//Create an event listener for submit
searchEl.addEventListener("submit", function(event){
    event.preventDefault(); 
    if (citySearchEl == "") {
        window.alert("Please enter a city name.");
        return;
    }
    getCity(citySearchEl.value);
});