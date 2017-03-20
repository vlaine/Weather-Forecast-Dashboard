var apiKey = "PUT_YOUR_API_KEY_HERE"; // darksky.net api key
var latitude = "45.536031"; // Showing Montreal.  search your city on google map and look at the url to get your latitude and longitude
var longitude = "-73.5906905";
var lang = "en"; // too many options.  check here https://darksky.net/dev/docs/forecast
var units = "si"; // auto, ca, uk2, us, si
var degreeSymbol = "C"; // C or F
var rainPrecUnit = "mm";
var snowPrecUnit = "cm";
var windUnit = "km/h"
var forecastNbOfDays = 6; // 0 to 8
var hourlyNbOfHours = 20; // 0-49

var showAlerts = true;
var showCurrentForecast = true;
var showCurrentIcon = true;
var showCurrentSummary = true;
var showCurrentDateTime = true;
var showForecastIcon = true;
var showForecastSummary = true;
var showHourlyIcon = true;
var showDarkSkyLink = true; // set to true if you have a free darksky api key.  

var debugging = false; // will allow showing forecast for past days.  Usefull when playing with sample data

// Set for your language
// English
var todayLabel = "Today";
var windLabel = "wind";
var apparentTempLabel = "feeling";
var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// French
//var todayLabel = "Aujourd'hui";
//var windLabel = "vent";
//var apparentTempLabel = "ressentie";
//var week = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
//var month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

var url = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?lang=' + lang + '&units=' + units;
