// Most of the params can also be set in the query string
// ex: http://{yourdomain}/index.html?apikey=00000000000000000000000000000000&latitude=45.4973&longitude=-73.5707&lang=en&theme=black

var apiKey = "PUT_YOUR_API_KEY_HERE"; // OpenWeatherMap api key
var latitude = "45.4973"; // Showing Montreal.  search your city on google map and look at the url to get your latitude and longitude
var longitude = "-73.5707";
var lang = "en"; // too many options.  check here https://openweathermap.org/api/one-call-api#multi
var units = "metric"; // metric (Celsius), imperial (Fahrenheit), standard (Kelvin)
var degreeSymbol = "C"; // C or F
var rainPrecUnit = "mm";
var snowPrecUnit = "cm";
var windUnit = "km/h";
var forecastNbOfDays = 6; // 0 to 8
var hourlyNbOfHours = 20; // 0-49
var theme = "black"; // "blue", "black", "white"

var showScrollingAlerts = true;
var showCurrentWeather = true;
var showCurrentIcon = true;
var showCurrentSummary = true;
var showCurrentWind = true;
var showCurrentWindBearing = true;
var showCurrentHumidity = true;
var showCurrentDate = true;
var showCurrentTime = true;

var showHourlyIcon = true;
var showHourlyWind = false;
var showHourlyWindBearing = false;
var showHourlyAccumulation = true;
var showHourlyHumidity = false;
var showHourlyProbability = true;

var showForecastIcon = true;
var showForecastSummary = true;
var showForecastMinTemp = true;
var showForecastWind = false;
var showForecastWindBearing = false;
var showForecastHumidity = false;
var showForecastAccumulation = true;
var showForecastProbability = true;

var debugging = false; // will allow showing forecast for past days.  Usefull when playing with sample data

// Add your language if missing
var labelsDict =
{
    "default": {
        todayLabel: "Today",
        windLabel: "wind",
        apparentTempLabel: "feeling",
        week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    "fr": {
        todayLabel: "Aujourd'hui",
        windLabel: "vent",
        apparentTempLabel: "ressentie",
        week: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        month: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    }
};

var labels;
var url;
