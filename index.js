var weatherResults = $(".search-results");
var searchButton = $(".search-button");
var clearButton = $(".clear-button");
var listGroup = $(".list-group");
var listContainer = $(".list-container")
var cityName = $(".search-bar").val();
var forecastContainer = $(".forcast-container");
var uvContainer = $(".uv-container")
var apiKey = "4dbc067d51b93bd057b9204921e040e5"
var cities = JSON.parse(localStorage.getItem("cities")) || [];

function init() {
  showHistory();
}
init();

function searchInput(event) {
  event.preventDefault();

  var searchBar = $("search-bar").val();

  if (!findCity(searchBar)) {
    cities.push(searchBar);
  }
  if (searchBar) {
    saveSearches();
    showSearches();
    getWeather(searchBar);
  }

  if (!searchBar) {
    $('#myModal').modal("show");
    $(".modal-body").text("Enter City name")
  }
}

function getWeather(cityName) {

  var requrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid" + apiKey;
  var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=" + apiKey;

  fetch(requrl)
    .then(function (response) {
      if (response.ok) {
        response.JSON().then(function (data) {
          displayResults(data);
          console.log(data)

          var latitude = data.coord.latitude
          var longitude = data.coord.longitude

          var latLonurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey

          fetch(latLonurl)
            .then(function (response) {
              if (response.ok) {
                response.json().then(function (index) {
                  showUV(index);
                }
                )
              }
            })
          fetch(fiveDay)
          then(function (response) {
            if (response.ok) {
              response.json().then(function (results) {
                showFiveDay(results);
                console.log(results)
              })
            }
          }
          )
        }
    ,})
}

