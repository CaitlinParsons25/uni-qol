var cityForm = document.querySelector('#city-form');
var cityInput = document.querySelector('#city');
var cityInfoCont = document.querySelector('#info-container');
var enterInfo = document.querySelector("#enter");
var hidden = document.querySelector("#hidden");
var footer = document.querySelector("#footer");

// add loaders
var spinnerWrapperQol = document.querySelector("#spin-wrap-qol");
var spinnerQol = document.createElement("div");
spinnerQol.classList.add("spinner", "spinner:before", "spinner:after");
spinnerWrapperQol.appendChild(spinnerQol);
var spinnerWrapperWeather = document.querySelector("#spin-wrap-weather");
var spinnerWeather = document.createElement("div");
spinnerWeather.classList.add("spinner", "spinner:before", "spinner:after");
spinnerWrapperWeather.appendChild(spinnerWeather);

let urbanareaapi = "";
let summary = "";
var cityName = "";

// start quality of life API code
var cityFormHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

 // show hidden div
 hidden.classList.remove("hidden");

 // change footer position
 footer.classList.add("footer-after");
  // get value from input element
  var city = cityInput.value.trim().toLowerCase();
  cityName = city
  if (city) {
    getCityInfo(city);
    getWeather(cityName);
    // add localStorage
    localStorage.setItem("cityInput", cityName);
    // clear old content
    cityInfoCont.textContent = '';
    cityInput.value = '';
  } else {
    enterInfo.textContent = 'PLEASE ENTER VALID CITY';
  }
};

var getCityInfo = function(input) {
  // format the github api url
  var apiUrl = 'https://api.teleport.org/api/cities/?search=' + input + '&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurbanarea%2Fua%3Ascores';
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          urbanareaapi = data._embedded["city:search-results"][0]._embedded["city:item"]._links["city:urban_area"].href + 'scores/';
          globalThis.urbanareaapi = urbanareaapi; 
        urbanApiFetch();
        });
      } else {
        enterInfo.textContent = 'PLEASE ENTER VALID CITY';
      }
    })
    .catch(function(error) {
      enterInfo.textContent = 'Unable to connect to Teleport API';
    });
};

var urbanApiFetch = function(){
fetch(urbanareaapi)
    .then(function(response) {    
      if (response.ok) {
        spinnerWrapperQol.style.display = "none";
        response.json().then(function(data) {
        summary = data.summary;
        cityInfoCont.innerHTML = summary;       
        });
      } else {
        enterInfo.textContent = 'PLEASE ENTER VALID CITY';
      }
    })
    .catch(function(error) {
      enterInfo.textContent = 'Unable to connect to Teleport API';
    });
};

// add event listeners to forms
cityForm.addEventListener('submit', cityFormHandler);
// end quality of life API code

// start weather API code
// day 1 variables
var dayOneDate = document.getElementById("date1");
var dayOneTempMin = document.getElementById("temp1-min");
var dayOneTempMax = document.getElementById("temp1-max");
var dayOneCondition = document.getElementById("condition1");

// day 2 variables
var dayTwoDate = document.getElementById("date2");
var dayTwoTempMin = document.getElementById("temp2-min");
var dayTwoTempMax = document.getElementById("temp2-max");
var dayTwoCondition = document.getElementById("condition2");

// get weather API function
var getWeather = function () {
    // fetch api from OpenWeatherMap
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=cbe5d9da9d040ae0db1e7af14bfcdcce"; 
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            return response.json().then(function(data) {
                spinnerWrapperWeather.style.display = "none"
                // day 1
                let date1 = moment(data.list[0].dt_txt).format("MMMM DD, YYYY");
                dayOneDate.textContent = date1;
                dayOneTempMin.textContent = "Low: " + (data.list[3].main.temp_min) + "F";
                dayOneTempMax.textContent = "High: " + (data.list[6].main.temp_max) + "F";
                dayOneCondition.textContent = (data.list[0].weather[0].description);

                // day 2
                let date2 = moment(data.list[10].dt_txt).format("MMMM DD, YYYY");
                dayTwoDate.textContent = date2;
                dayTwoTempMin.textContent = "Low: " + (data.list[11].main.temp_min) + "F";
                dayTwoTempMax.textContent = "High: " + (data.list[14].main.temp_max) + "F"; 
                dayTwoCondition.textContent = (data.list[7].weather[0].description);
            });
        };
    });
};
// end weather API code

// search history function
var getHistory = function() {
  var history = document.getElementById("history");
  history.innerHTML = localStorage.getItem("cityInput");
};

// call to populate search history
getHistory();

// background loop function
var video = document.getElementById("video")
video.loop = true