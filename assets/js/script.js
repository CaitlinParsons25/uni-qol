var CityForm = document.querySelector('#city-form');
var CityInput = document.querySelector('#city');
var cityInfoCont = document.querySelector('#info-container');

let urbanareaapi = ""
let summary = ""

var CityFormHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();
  // get value from input element
  var city = CityInput.value.trim().toLowerCase();
  if (city) {
    getCityInfo(city);
    // clear old content
    cityInfoCont.textContent = '';
    CityInput.value = '';
  } else {
    alert('Please enter a City');
  }
};

var getCityInfo = function(input) {
  // format the github api url
  var apiUrl = 'https://api.teleport.org/api/cities/?search=' + input + '&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurbanarea%2Fua%3Ascores'
    // console.log(apiUrl)
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        // console.log(apiUrl)
        // console.log(response);
        response.json().then(function(data) {
          // console.log(data);
          urbanareaapi = data._embedded["city:search-results"][0]._embedded["city:item"]._links["city:urban_area"].href + 'scores/'
          console.log(urbanareaapi)
          globalThis.urbanareaapi = urbanareaapi 
        urbanApiFetch()
        });
      } else {
        alert('Error: City Not Found');
      }
    })
    .catch(function(error) {
      alert('Unable to connect to Teleport API');
    });
};

var urbanApiFetch = function(){
fetch(urbanareaapi)
    .then(function(response) {    
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
        console.log(data.summary)
        summary = data.summary
        cityInfoCont.innerHTML = summary        
        });
      } else {
        alert('Error: City Not Found');
      }
    })
    .catch(function(error) {
      alert('Unable to connect to Teleport API');
    });
}

// add event listeners to forms
CityForm.addEventListener('submit', CityFormHandler);


var cityName = "Austin";

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

// day 3 variables
var dayThreeDate = document.getElementById("date3");
var dayThreeTempMin = document.getElementById("temp3-min");
var dayThreeTempMax = document.getElementById("temp3-max");
var dayThreeCondition = document.getElementById("condition3");

// day 4 variables
var dayFourDate = document.getElementById("date4");
var dayFourTempMin = document.getElementById("temp4-min");
var dayFourTempMax = document.getElementById("temp4-max");
var dayFourCondition = document.getElementById("condition4");

// day 5 variables
var dayFiveDate = document.getElementById("date5");
var dayFiveTempMin = document.getElementById("temp5-min");
var dayFiveTempMax = document.getElementById("temp5-max");
var dayFiveCondition = document.getElementById("condition5");

// get weather forecast function
var getWeather = function () {
    // fetch api from OpenWeatherMap
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&cnt=5&appid=cbe5d9da9d040ae0db1e7af14bfcdcce"; 
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            return response.json().then(function(data) {
                console.log(data);
                // day 1
                let date1 = moment(data.list[0].dt_txt).format("MMMM DD, YYYY");
                dayOneDate.textContent = date1;
                dayOneTempMin.textContent = "Low: " + (data.list[0].main.temp_min);
                dayOneTempMax.textContent = "High: " + (data.list[0].main.temp_max);
                dayOneCondition.textContent = (data.list[0].weather[0].description);

                // day 2
                let date2 = moment(data.list[1].dt_txt).format("MMMM DD, YYYY");
                dayTwoDate.textContent = date2;
                dayTwoTempMin.textContent = "Low: " + (data.list[1].main.temp_min);
                dayTwoTempMax.textContent = "High: " + (data.list[1].main.temp_max); 
                dayTwoCondition.textContent = (data.list[1].weather[0].description);

                // day 3
                let date3 = moment(data.list[2].dt_txt).format("MMMM DD, YYYY");
                dayTwoDate.textContent = date3;
                dayTwoTempMin.textContent = "Low: " + (data.list[2].main.temp_min);
                dayTwoTempMax.textContent = "High: " + (data.list[2].main.temp_max); 
                dayTwoCondition.textContent = (data.list[2].weather[0].description);

                // day 4
                let date4 = moment(data.list[3].dt_txt).format("MMMM DD, YYYY");
                dayTwoDate.textContent = date4;
                dayTwoTempMin.textContent = "Low: " + (data.list[3].main.temp_min);
                dayTwoTempMax.textContent = "High: " + (data.list[3].main.temp_max); 
                dayTwoCondition.textContent = (data.list[3].weather[0].description);

                // day 5
                let date5 = moment(data.list[4].dt_txt).format("MMMM DD, YYYY");
                dayTwoDate.textContent = date5;
                dayTwoTempMin.textContent = "Low: " + (data.list[4].main.temp_min);
                dayTwoTempMax.textContent = "High: " + (data.list[4].main.temp_max); 
                dayTwoCondition.textContent = (data.list[4].weather[0].description);
                
            });
        } else {
            // display message "City not found; try another city."
        };
    });
};

getWeather();

// weather API code ends
