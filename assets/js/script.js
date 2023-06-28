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
    searchHistory();
});


//Search History - Got this from a YouTube video
var recentSearch = [];

function searchHistory() {

    if (recentSearch.includes(citySearchEl.value)) {
        return;
    }

    if (recentSearch.length >= 5) {
        recentSearch.shift()
    }

    recentSearch.push(citySearchEl.value);
    document.getElementById("history-line").innerHTML = "";

    for (var i = 0; i < recentSearch.length; i++) {
        const btn = document.createElement("button");
        btn.innerHTML = recentSearch[i];
        document.getElementById("history-line").appendChild(btn);
    }
}




//This section creates the 5 day weather forecast with icons
    var fiveDayForecastSection = function(city) {
//Gets and uses data from open weather current weather api
        fetch//(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
//Gets response and turns it into objects
            .then(function(response) {
            return response.json();
        })
            .then(function(response) {
//Gets city's longitude and latitude
    var cityLon = response.coord.lon;
    var cityLat = response.coord.lat;

        fetch//(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
//Gets response from one call api and turns it into objects
            .then(function(response) {
            return response.json();
        })
            .then(function(response) {
            console.log(response);


//5 day forecast title
    var futureForecastTitle = $("#five-day-forecast-title");
    futureForecastTitle.text("5-Day Forecast:")

//Setting up each day of 5 day forecast
    for (var i = 1; i <= 5; i++) {
//Added class element to future cards to create card containers
        var fiveDayCard = $(".five-day-forecast-card");
        fiveDayCard.addClass("five-day-card-details");

//Added date to 5 day forecast
        var futureDate = $("#date-" + i);
        date = moment().add(i, "d").format("M/D/YYYY");
        futureDate.text(date);

//Added icon to 5 day forecast
        var futureIcon = $("#icon-" + i);
        futureIcon.addClass("future-icon");
        var futureIconCode = response.daily[i].weather[0].icon;
        futureIcon.attr//("src", `https://openweathermap.org/img/wn/${futureIconCode}@2x.png`);

 //Added temp to 5 day forecast
        var futureTemp = $("#temp-" + i);
        futureTemp.text("Temp: " + response.daily[i].temp.day + " \u00B0F");

//Added humidity to 5 day forecast
        var futureHumidity = $("#humidity-" + i);
        futureHumidity.text("Humidity: " + response.daily[i].humidity + "%");
            }
        })
    })
};
