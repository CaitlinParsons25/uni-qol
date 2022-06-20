var dayOneTemp = document.getElementById("temp");
var dayOneCondition = document.getElementById("condition")
var button = document.getElementById("btn");

var getWeather = function () {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Austin&units=imperial&cnt=5&appid=cbe5d9da9d040ae0db1e7af14bfcdcce"; 
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            return response.json().then(function(data) {
                console.log(data);
                dayOneTemp.textContent = (data.list[0].main.temp);
                dayOneCondition.textContent = (data.list[0].weather[0].description);
                
            });
        } else {
            // display message "City not found; try another city."
        };
    });
};



button.addEventListener("click", getWeather);

