var CityForm = document.querySelector('#city-form');
var CityInput = document.querySelector('#city');
var cityInfoCont = document.querySelector('#info-container');
var repoSearchTerm = document.querySelector('#searched-city');
let urbanareaapi = ""
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
    console.log(apiUrl)
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        // console.log(apiUrl)
        // console.log(response);
        response.json().then(function(data) {
        //   console.log(data);
          urbanareaapi = data._embedded["city:search-results"][0]._embedded["city:item"]._links["city:urban_area"]
          console.log(urbanareaapi)
        //   displayScore(data, input);
        });
      } else {
        alert('Error: City Not Found');
      }
    })
    .catch(function(error) {
      alert('Unable to connect to Teleport API');
    });
};

console.log(urbanareaapi)

var displayScores = function(scores, searchTerm) {
  // check if api returned any repos
  if (scores.length === 0) {
    cityInfoCont.textContent = 'No City Information found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;


};

// add event listeners to forms
CityForm.addEventListener('submit', CityFormHandler);

// _embedded["city:search-results"][0]._embedded["city:item"]._links["city:urban_area"]

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