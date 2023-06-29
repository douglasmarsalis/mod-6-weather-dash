var apiKey = "e4edabe0cf965862c45bd6d4d7037770";
var city;
var searchEl = document.querySelector("#search-form");
var citySearchEl = document.querySelector("#city-search");

//City, Current data and Forecast
function getCity(cityName) {
    console.log(cityName);
    var geoLocationURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`
    console.log(geoLocationURL);
    fetch(geoLocationURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            fiveDayForecastSection(data);
            var todayWeather = data.list[0];
            var weatherIcon = todayWeather.weather[0].icon;
            document.querySelector("#current-city").textContent = data.city.name + " " + todayWeather.dt_txt.split(" ")[0];
            document.querySelector("#current-weather-icon").src = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
            document.querySelector("#current-temp").textContent = "Temperature: " + todayWeather.main.temp_max + "F";
            document.querySelector("#current-humidity").textContent = "Humidity: " + todayWeather.main.humidity + "%";
            document.querySelector("#current-wind").textContent = "Wind: " + todayWeather.wind.speed + "mph";
        });
};

//The $ before the {} creates template literal variables
//var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

//Create an event listener for submit
searchEl.addEventListener("submit", function (event) {
    event.preventDefault();
    if (citySearchEl == "") {
        window.alert("Please enter a city name.");
        return;
    }
    getCity(citySearchEl.value);
    searchHistory();
});


//Search History - Got idea for this from a YouTube video but tutor assisted to clean up
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
    localStorage.setItem ("searches", JSON.stringify(recentSearch))
    for (var i = 0; i < recentSearch.length; i++) {
        const btn = document.createElement("button");
        btn.innerHTML = recentSearch[i];

        document.getElementById("history-line").appendChild(btn);
    }
}

function init() {
    recentSearch = JSON.parse(localStorage.getItem("searches")) || []
    for (var i = 0; i < recentSearch.length; i++) {
        const btn = document.createElement("button");
        btn.innerHTML = recentSearch[i];
        document.getElementById("history-line").appendChild(btn);
        }
    }
init()    

//This section creates the 5 day weather forecast with icons
var fiveDayForecastSection = function (data) {
    // console.log(coords);
    //         //Gets city's longitude and latitude
    //         var cityLon = coords.lon;
    //         var cityLat = coords.lat;

    //         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
    //             //Gets response from one call api and turns it into objects
    //             .then(function (response) {
    //                 return response.json();
    //             })
    //             .then(function (response) {
    //                 console.log(response);


                    //5 day forecast title
                    var futureForecastTitle = $("#five-day-forecast-title");
                    futureForecastTitle.text("5-Day Forecast:")

                    //Setting up each day of 5 day forecast
                    for (var i = 0; i < 5; i++) {
                        var index = i * 8 + 5;
                        var thisDay = data.list[index];
                        //Added class element to future cards to create card containers
                        var fiveDayCard = $(".five-day-forecast-card");
                        fiveDayCard.addClass("five-day-card-details");

                        //Added date to 5 day forecast
                        var futureDate = $("#date-" + i);
                        //date = dayjs().format("M/D/YYYY");
                        futureDate.text(thisDay.dt_txt);

                        //Added icon to 5 day forecast
                        var futureIcon = $("#icon-" + i);
                        futureIcon.addClass("future-icon");
                        var futureIconCode = thisDay.weather[0].icon;
                        futureIcon.attr ("src", "http://openweathermap.org/img/w/" + futureIconCode + ".png")

                        //Added temp to 5 day forecast
                        var futureTemp = $("#temp-" + i);
                        futureTemp.text("Temp: " + thisDay.main.temp_max + " \u00B0F");

                        //Added humidity to 5 day forecast
                        var futureHumidity = $("#humidity-" + i);
                        futureHumidity.text("Humidity: " + thisDay.main.humidity + "%");
                    }
                // })
};

document.querySelector("#history-line").addEventListener("click", function(event){
    if (event.target.type == "submit"){
        getCity(event.target.textContent)
    }
})

//Local Storage: https://blog.logrocket.com/localstorage-javascript-complete-guide/
/*
//Store values in local storage
localStorage.setItem('name', 'Douglas');
const userArray = ["Douglas",18]
//local storage can only store strings so have to use JSON stringify to convert arrays or objects to strings
localStorage.setItem('user', JSON.stringify(userArray));

//Allows you to access the data stored in browser
localStorage.getItem('user');
JSON.parse(localStorage.getItem('user'));
//JSON parse converts string to an object
const userData = JSON.parse(localStorage.getItem('user'));
console.log(userData);
//Here is the object
const userArray2 = ["Oscar", 27];
console.log(userArray2);

//To delete items in local storage
.localStorage.removeItem('name');

//To delete all items in local storage
localStorage.clear();

//comes in handy when you need to loop through keys but still be able to pass a number or index to localStorage to retrieve the name of the key
localStorage.key(index);
*/


//Example: https://blog.logrocket.com/localstorage-javascript-complete-guide/
/*const ul = document.querySelector('ul');
const input = document.getElementById('item');

let itemsArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];

itemsArray.forEach(addTask);
function addTask(text){
  const li = document.createElement('li')
  li.textContent = text;
  ul.appendChild(li);
}

function add(){
  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  addTask(input.value);
  input.value = '';
}
function del(){
  localStorage.clear();
  ul.innerHTML = '';
  itemsArray = [];
}
*/
