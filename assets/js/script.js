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