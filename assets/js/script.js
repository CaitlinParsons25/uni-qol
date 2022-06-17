cityform = document.querySelector("#cityinput")
cityinput = document.querySelector("city")

var formInputHandler = function(event) {
    event.preventDefault()
    var cityname = cityinput.value.trim()
    if (cityname){
        getcityinfo(cityname);
    }
    else {
        alert("Please input a city")
        //make a div to alert they need to input a city
    }
}


var getcityinfo = function(cityinput) {

    var apiURL = 'https://api.teleport.org/api/cities/?search=" + city'

    fetch(apiURL)
        .then(function(response){
            if (response.ok) {
                console.log(response)
                response.json().then(function(data){
                    console.log(data)
                    //display city info function

                })
            } else{
                alert("city not found")
            }
        })
}

cityinput.addEventListener("submit",formInputHandler);





// var getCities = function(){
//     fetch("https://api.teleport.org/api/").then(function(response) {
//         response.json().then(function(data) {
//           console.log(data);
//         });
//     })
// };
// getCities()
// console.log(getCities)
// var getusercity = function() {
//     var apiurl = "https://api.teleport.org/api/cities/?search=" + city + {
        
//     }
// }