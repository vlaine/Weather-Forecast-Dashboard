var hasAlerts;

function initialize()
{
    setParamValues();

    $('#theme').attr('href', 'theme/' + theme + '.css');
	hideUnwantedData();
	$("#apparentTempLabel").text(labels.apparentTempLabel);
	$("#windLabel").text(labels.windLabel);
	showDateTime();
	getForecast();
	
	var t = setInterval(showDateTime, 500);
	var f = setInterval(getForecast, 300000);
}

function setParamValues() {
    apiKey = getQueryStringParam('apikey', apiKey);
    latitude = getQueryStringParam('latitude', latitude);
    longitude = getQueryStringParam('longitude', longitude);
    lang = getQueryStringParam('lang', lang);
    units = getQueryStringParam('units', units);
    degreeSymbol = getQueryStringParam('degreeSymbol', degreeSymbol);
    rainPrecUnit = getQueryStringParam('rainPrecUnit', rainPrecUnit);
    snowPrecUnit = getQueryStringParam('snowPrecUnit', snowPrecUnit);
    windUnit = getQueryStringParam('windUnit', windUnit);
    forecastNbOfDays = getQueryStringParam('forecastNbOfDays', forecastNbOfDays);
    hourlyNbOfHours = getQueryStringParam('hourlyNbOfHours', hourlyNbOfHours);
    theme = getQueryStringParam('theme', theme);
    showScrollingAlerts = getQueryStringParamAsBool('showScrollingAlerts', showScrollingAlerts);
    showCurrentWeather = getQueryStringParamAsBool('showCurrentWeather', showCurrentWeather);
    showCurrentIcon = getQueryStringParamAsBool('showCurrentIcon', showCurrentIcon);
    showCurrentSummary = getQueryStringParamAsBool('showCurrentSummary', showCurrentSummary);
    showCurrentWind = getQueryStringParamAsBool('showCurrentWind', showCurrentWind);
    showCurrentWindBearing = getQueryStringParamAsBool('showCurrentWindBearing', showCurrentWindBearing);
    showCurrentHumidity = getQueryStringParamAsBool('showCurrentHumidity', showCurrentHumidity);
    showCurrentDate = getQueryStringParamAsBool('showCurrentDate', showCurrentDate);
    showCurrentTime = getQueryStringParamAsBool('showCurrentTime', showCurrentTime);
    showHourlyIcon = getQueryStringParamAsBool('showHourlyIcon', showHourlyIcon);
    showHourlyWind = getQueryStringParamAsBool('showHourlyWind', showHourlyWind);
    showHourlyWindBearing = getQueryStringParamAsBool('showHourlyWindBearing', showHourlyWindBearing);
    showHourlyAccumulation = getQueryStringParamAsBool('showHourlyAccumulation', showHourlyAccumulation);
    showHourlyHumidity = getQueryStringParamAsBool('showHourlyHumidity', showHourlyHumidity);
    showHourlyProbability = getQueryStringParamAsBool('showHourlyProbability', showHourlyProbability);
    showForecastIcon = getQueryStringParamAsBool('showForecastIcon', showForecastIcon);
    showForecastSummary = getQueryStringParamAsBool('showForecastSummary', showForecastSummary);
    showForecastMinTemp = getQueryStringParamAsBool('showForecastMinTemp', showForecastMinTemp);
    showForecastWind = getQueryStringParamAsBool('showForecastWind', showForecastWind);
    showForecastWindBearing = getQueryStringParamAsBool('showForecastWindBearing', showForecastWindBearing);
    showForecastHumidity = getQueryStringParamAsBool('showForecastHumidity', showForecastHumidity);
    showForecastAccumulation = getQueryStringParamAsBool('showForecastAccumulation', showForecastAccumulation);
    showForecastProbability = getQueryStringParamAsBool('showForecastProbability', showForecastProbability);
	showDetailedSummary = getQueryStringParamAsBool('showDetailedSummary', showDetailedSummary);	
    debugging = getQueryStringParamAsBool('debugging', debugging);
    lang = getQueryStringParam('lang', lang);

    labels = labelsDict["default"];
    if (labelsDict[lang] !== null && labelsDict[lang] !== undefined)
    {
        labels = labelsDict[lang];
    }

    url = 'http://api.openweathermap.org/data/3.0/onecall?lat=' + latitude + '&lon=' + longitude + '&units=' + units + '&lang=' + lang + '&APPID=' + apiKey;

}

function getQueryStringParam(name, defaultIfMissing) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)', 'i').exec(window.location.search);
    return (!results || !results[1]) ? defaultIfMissing : results[1];
}

function getQueryStringParamAsBool(name, defaultIfMissing) {
    var result = getQueryStringParam(name, defaultIfMissing);
    return result == "true" || result == true ? true : false;
}

function getForecast()
{
    //openweather sample Data
    //normal sample data
    //var sampleData = '{"lat":45.4973,"lon":-73.5707,"timezone":"America/Toronto","timezone_offset":-14400,"current":{"dt":1616799925,"sunrise":1616755523,"sunset":1616800449,"temp":4.55,"feels_like":0.26,"pressure":1000,"humidity":93,"dew_point":3.52,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":4.12,"wind_deg":10,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},"minutely":[{"dt":1616799960,"precipitation":0},{"dt":1616800020,"precipitation":0},{"dt":1616800080,"precipitation":0},{"dt":1616800140,"precipitation":0},{"dt":1616800200,"precipitation":0},{"dt":1616800260,"precipitation":0},{"dt":1616800320,"precipitation":0},{"dt":1616800380,"precipitation":0},{"dt":1616800440,"precipitation":0},{"dt":1616800500,"precipitation":0},{"dt":1616800560,"precipitation":0},{"dt":1616800620,"precipitation":0},{"dt":1616800680,"precipitation":0},{"dt":1616800740,"precipitation":0},{"dt":1616800800,"precipitation":0},{"dt":1616800860,"precipitation":0},{"dt":1616800920,"precipitation":0},{"dt":1616800980,"precipitation":0},{"dt":1616801040,"precipitation":0},{"dt":1616801100,"precipitation":0},{"dt":1616801160,"precipitation":0},{"dt":1616801220,"precipitation":0},{"dt":1616801280,"precipitation":0},{"dt":1616801340,"precipitation":0},{"dt":1616801400,"precipitation":0},{"dt":1616801460,"precipitation":0},{"dt":1616801520,"precipitation":0},{"dt":1616801580,"precipitation":0},{"dt":1616801640,"precipitation":0.1004},{"dt":1616801700,"precipitation":0.115},{"dt":1616801760,"precipitation":0.115},{"dt":1616801820,"precipitation":0.115},{"dt":1616801880,"precipitation":0.115},{"dt":1616801940,"precipitation":0.115},{"dt":1616802000,"precipitation":0.115},{"dt":1616802060,"precipitation":0.1892},{"dt":1616802120,"precipitation":0.2634},{"dt":1616802180,"precipitation":0.3376},{"dt":1616802240,"precipitation":0.4118},{"dt":1616802300,"precipitation":0.486},{"dt":1616802360,"precipitation":0.486},{"dt":1616802420,"precipitation":0.486},{"dt":1616802480,"precipitation":0.486},{"dt":1616802540,"precipitation":0.486},{"dt":1616802600,"precipitation":0.486},{"dt":1616802660,"precipitation":0.5184},{"dt":1616802720,"precipitation":0.5508},{"dt":1616802780,"precipitation":0.5832},{"dt":1616802840,"precipitation":0.6156},{"dt":1616802900,"precipitation":0.648},{"dt":1616802960,"precipitation":0.648},{"dt":1616803020,"precipitation":0.648},{"dt":1616803080,"precipitation":0.648},{"dt":1616803140,"precipitation":0.648},{"dt":1616803200,"precipitation":0.648},{"dt":1616803260,"precipitation":0.5914},{"dt":1616803320,"precipitation":0.5348},{"dt":1616803380,"precipitation":0.4782},{"dt":1616803440,"precipitation":0.4216},{"dt":1616803500,"precipitation":0.365},{"dt":1616803560,"precipitation":0.365}],"hourly":[{"dt":1616799600,"temp":4.55,"feels_like":-0.08,"pressure":1000,"humidity":93,"dew_point":3.52,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":4.6,"wind_deg":337,"wind_gust":10.3,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0.8},{"dt":1616803200,"temp":4.84,"feels_like":-0.86,"pressure":1002,"humidity":91,"dew_point":3.5,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":6.12,"wind_deg":323,"wind_gust":10.41,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10n"}],"pop":1,"rain":{"1h":0.65}},{"dt":1616806800,"temp":4.64,"feels_like":-0.67,"pressure":1005,"humidity":82,"dew_point":1.84,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":5.16,"wind_deg":329,"wind_gust":11.87,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10n"}],"pop":0.69,"rain":{"1h":0.21}},{"dt":1616810400,"temp":5.03,"feels_like":-0.19,"pressure":1008,"humidity":77,"dew_point":1.34,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":4.91,"wind_deg":330,"wind_gust":10.02,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0.7},{"dt":1616814000,"temp":4.99,"feels_like":-0.18,"pressure":1011,"humidity":72,"dew_point":0.37,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":4.62,"wind_deg":319,"wind_gust":8.97,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0.63},{"dt":1616817600,"temp":4.76,"feels_like":-0.01,"pressure":1012,"humidity":72,"dew_point":0.13,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":4.01,"wind_deg":325,"wind_gust":7.92,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0.59},{"dt":1616821200,"temp":4.61,"feels_like":0.23,"pressure":1013,"humidity":71,"dew_point":-0.12,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":3.38,"wind_deg":325,"wind_gust":6.79,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0.51},{"dt":1616824800,"temp":4.34,"feels_like":0.44,"pressure":1014,"humidity":69,"dew_point":-0.82,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":2.57,"wind_deg":325,"wind_gust":5.78,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0.47},{"dt":1616828400,"temp":4.06,"feels_like":0.37,"pressure":1015,"humidity":70,"dew_point":-0.95,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":2.25,"wind_deg":304,"wind_gust":4.67,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616832000,"temp":3.74,"feels_like":-0.02,"pressure":1016,"humidity":71,"dew_point":-0.99,"uvi":0,"clouds":99,"visibility":10000,"wind_speed":2.33,"wind_deg":306,"wind_gust":4.29,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616835600,"temp":3.13,"feels_like":-0.41,"pressure":1017,"humidity":72,"dew_point":-1.4,"uvi":0,"clouds":95,"visibility":10000,"wind_speed":1.93,"wind_deg":320,"wind_gust":3.6,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616839200,"temp":2.35,"feels_like":-0.99,"pressure":1018,"humidity":74,"dew_point":-1.77,"uvi":0,"clouds":73,"visibility":10000,"wind_speed":1.58,"wind_deg":333,"wind_gust":2.97,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1616842800,"temp":1.92,"feels_like":-1.37,"pressure":1019,"humidity":74,"dew_point":-2.19,"uvi":0,"clouds":60,"visibility":10000,"wind_speed":1.43,"wind_deg":328,"wind_gust":2.73,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}],"pop":0},{"dt":1616846400,"temp":2.29,"feels_like":-1.01,"pressure":1020,"humidity":70,"dew_point":-2.61,"uvi":0.32,"clouds":52,"visibility":10000,"wind_speed":1.37,"wind_deg":338,"wind_gust":2.47,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}],"pop":0},{"dt":1616850000,"temp":3.15,"feels_like":-0.05,"pressure":1021,"humidity":64,"dew_point":-2.88,"uvi":0.92,"clouds":9,"visibility":10000,"wind_speed":1.16,"wind_deg":344,"wind_gust":1.88,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"pop":0},{"dt":1616853600,"temp":4.24,"feels_like":1.2,"pressure":1021,"humidity":60,"dew_point":-2.94,"uvi":1.84,"clouds":12,"visibility":10000,"wind_speed":0.97,"wind_deg":337,"wind_gust":1.58,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02d"}],"pop":0},{"dt":1616857200,"temp":5.24,"feels_like":2.06,"pressure":1022,"humidity":55,"dew_point":-2.96,"uvi":2.84,"clouds":16,"visibility":10000,"wind_speed":1.13,"wind_deg":294,"wind_gust":1.93,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02d"}],"pop":0},{"dt":1616860800,"temp":5.92,"feels_like":2.54,"pressure":1021,"humidity":53,"dew_point":-2.94,"uvi":2.71,"clouds":37,"visibility":10000,"wind_speed":1.43,"wind_deg":276,"wind_gust":2.14,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03d"}],"pop":0},{"dt":1616864400,"temp":6.69,"feels_like":3.47,"pressure":1021,"humidity":51,"dew_point":-2.68,"uvi":2.92,"clouds":49,"visibility":10000,"wind_speed":1.24,"wind_deg":266,"wind_gust":2.23,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03d"}],"pop":0},{"dt":1616868000,"temp":7.31,"feels_like":4.7,"pressure":1021,"humidity":50,"dew_point":-2.45,"uvi":2.66,"clouds":58,"visibility":10000,"wind_speed":0.43,"wind_deg":276,"wind_gust":1.56,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}],"pop":0},{"dt":1616871600,"temp":7.79,"feels_like":5.39,"pressure":1021,"humidity":49,"dew_point":-2.26,"uvi":2.34,"clouds":100,"visibility":10000,"wind_speed":0.16,"wind_deg":109,"wind_gust":1.43,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1616875200,"temp":8.15,"feels_like":5.51,"pressure":1021,"humidity":48,"dew_point":-2.09,"uvi":1.46,"clouds":89,"visibility":10000,"wind_speed":0.51,"wind_deg":171,"wind_gust":1.97,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1616878800,"temp":8.11,"feels_like":5.2,"pressure":1021,"humidity":49,"dew_point":-2.03,"uvi":0.7,"clouds":87,"visibility":10000,"wind_speed":0.94,"wind_deg":94,"wind_gust":1.65,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1616882400,"temp":8.1,"feels_like":5.01,"pressure":1021,"humidity":49,"dew_point":-1.81,"uvi":0.26,"clouds":87,"visibility":10000,"wind_speed":1.19,"wind_deg":80,"wind_gust":1.73,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1616886000,"temp":7.35,"feels_like":3.83,"pressure":1022,"humidity":55,"dew_point":-1.06,"uvi":0,"clouds":83,"visibility":10000,"wind_speed":1.97,"wind_deg":95,"wind_gust":1.82,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}],"pop":0},{"dt":1616889600,"temp":6.14,"feels_like":1.83,"pressure":1022,"humidity":63,"dew_point":-0.35,"uvi":0,"clouds":86,"visibility":10000,"wind_speed":3.25,"wind_deg":97,"wind_gust":4.79,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616893200,"temp":5.5,"feels_like":1.4,"pressure":1023,"humidity":68,"dew_point":0.04,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":3.03,"wind_deg":102,"wind_gust":5.68,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616896800,"temp":5.27,"feels_like":1.56,"pressure":1022,"humidity":70,"dew_point":0.19,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":2.51,"wind_deg":102,"wind_gust":4.97,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616900400,"temp":5.28,"feels_like":2,"pressure":1021,"humidity":70,"dew_point":0.29,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":1.9,"wind_deg":105,"wind_gust":4.06,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616904000,"temp":5.02,"feels_like":1.73,"pressure":1021,"humidity":71,"dew_point":0.29,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":1.91,"wind_deg":84,"wind_gust":3.67,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616907600,"temp":4.98,"feels_like":1.42,"pressure":1020,"humidity":71,"dew_point":0.33,"uvi":0,"clouds":100,"visibility":10000,"wind_speed":2.28,"wind_deg":85,"wind_gust":4.77,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616911200,"temp":4.36,"feels_like":0.73,"pressure":1019,"humidity":75,"dew_point":0.21,"uvi":0,"clouds":99,"visibility":10000,"wind_speed":2.42,"wind_deg":67,"wind_gust":4.98,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0},{"dt":1616914800,"temp":3.59,"feels_like":-0.18,"pressure":1018,"humidity":78,"dew_point":0.27,"uvi":0,"clouds":23,"visibility":10000,"wind_speed":2.58,"wind_deg":56,"wind_gust":4.81,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}],"pop":0},{"dt":1616918400,"temp":3.34,"feels_like":-0.75,"pressure":1017,"humidity":79,"dew_point":0.11,"uvi":0,"clouds":55,"visibility":10000,"wind_speed":3.02,"wind_deg":51,"wind_gust":5.26,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1616922000,"temp":3.27,"feels_like":-0.88,"pressure":1017,"humidity":80,"dew_point":0.11,"uvi":0,"clouds":70,"visibility":10000,"wind_speed":3.13,"wind_deg":51,"wind_gust":5.4,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1616925600,"temp":3.37,"feels_like":-0.83,"pressure":1016,"humidity":80,"dew_point":0.26,"uvi":0,"clouds":78,"visibility":10000,"wind_speed":3.21,"wind_deg":59,"wind_gust":5.75,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1616929200,"temp":3.85,"feels_like":-0.32,"pressure":1015,"humidity":78,"dew_point":0.47,"uvi":0,"clouds":82,"visibility":10000,"wind_speed":3.2,"wind_deg":82,"wind_gust":8.92,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}],"pop":0},{"dt":1616932800,"temp":4.24,"feels_like":0.08,"pressure":1013,"humidity":82,"dew_point":1.55,"uvi":0.11,"clouds":85,"visibility":10000,"wind_speed":3.42,"wind_deg":104,"wind_gust":11.19,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"pop":0.24,"rain":{"1h":0.55}},{"dt":1616936400,"temp":4.99,"feels_like":0.66,"pressure":1012,"humidity":79,"dew_point":1.73,"uvi":0.23,"clouds":100,"visibility":10000,"wind_speed":3.71,"wind_deg":107,"wind_gust":13.05,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"pop":0.34,"rain":{"1h":0.12}},{"dt":1616940000,"temp":6.69,"feels_like":1.42,"pressure":1010,"humidity":76,"dew_point":2.85,"uvi":0.47,"clouds":100,"visibility":10000,"wind_speed":5.33,"wind_deg":134,"wind_gust":15.81,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0.26},{"dt":1616943600,"temp":7.62,"feels_like":0.6,"pressure":1008,"humidity":77,"dew_point":3.92,"uvi":0.73,"clouds":100,"visibility":10000,"wind_speed":8.11,"wind_deg":155,"wind_gust":17.82,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0.44},{"dt":1616947200,"temp":7.82,"feels_like":-0.34,"pressure":1005,"humidity":76,"dew_point":3.77,"uvi":1.05,"clouds":100,"visibility":10000,"wind_speed":9.73,"wind_deg":155,"wind_gust":19.39,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"pop":0.59,"rain":{"1h":0.25}},{"dt":1616950800,"temp":7.09,"feels_like":-0.97,"pressure":1003,"humidity":80,"dew_point":3.82,"uvi":1.13,"clouds":100,"visibility":10000,"wind_speed":9.6,"wind_deg":154,"wind_gust":21.84,"weather":[{"id":501,"main":"Rain","description":"pluie modérée","icon":"10d"}],"pop":0.93,"rain":{"1h":1.07}},{"dt":1616954400,"temp":6.54,"feels_like":-1.83,"pressure":1000,"humidity":79,"dew_point":3.24,"uvi":1.03,"clouds":100,"visibility":10000,"wind_speed":9.86,"wind_deg":153,"wind_gust":24.41,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"pop":0.97,"rain":{"1h":0.83}},{"dt":1616958000,"temp":7.04,"feels_like":-1.42,"pressure":997,"humidity":77,"dew_point":3.43,"uvi":0.23,"clouds":100,"visibility":10000,"wind_speed":10.02,"wind_deg":157,"wind_gust":23.59,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"pop":1,"rain":{"1h":0.54}},{"dt":1616961600,"temp":6.98,"feels_like":-1.82,"pressure":995,"humidity":78,"dew_point":3.47,"uvi":0.15,"clouds":100,"visibility":10000,"wind_speed":10.53,"wind_deg":161,"wind_gust":23.07,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"pop":0.99,"rain":{"1h":0.84}},{"dt":1616965200,"temp":7.08,"feels_like":-2.09,"pressure":993,"humidity":77,"dew_point":3.4,"uvi":0.07,"clouds":100,"visibility":10000,"wind_speed":11.04,"wind_deg":164,"wind_gust":23.01,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"pop":0.95,"rain":{"1h":0.33}},{"dt":1616968800,"temp":7.33,"feels_like":-1.82,"pressure":991,"humidity":80,"dew_point":4.25,"uvi":0.01,"clouds":100,"visibility":10000,"wind_speed":11.21,"wind_deg":164,"wind_gust":20.86,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"pop":1,"rain":{"1h":0.72}}],"daily":[{"dt":1616774400,"sunrise":1616755523,"sunset":1616800449,"temp":{"day":7.07,"min":4.55,"max":11.25,"night":4.99,"eve":5.84,"morn":9.47},"feels_like":{"day":2.26,"night":-0.18,"eve":0.8,"morn":6.36},"pressure":998,"humidity":93,"dew_point":6.09,"wind_speed":5.57,"wind_deg":47,"weather":[{"id":502,"main":"Rain","description":"forte pluie","icon":"10d"}],"clouds":100,"pop":1,"rain":38.82,"uvi":0.74},{"dt":1616860800,"sunrise":1616841808,"sunset":1616886926,"temp":{"day":5.92,"min":1.92,"max":8.15,"night":5.28,"eve":8.1,"morn":2.35},"feels_like":{"day":2.54,"night":2,"eve":5.01,"morn":-0.99},"pressure":1021,"humidity":53,"dew_point":-2.94,"wind_speed":1.43,"wind_deg":276,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03d"}],"clouds":37,"pop":0.59,"uvi":2.92},{"dt":1616947200,"sunrise":1616928093,"sunset":1616973403,"temp":{"day":7.82,"min":3.27,"max":9.22,"night":6.8,"eve":7.33,"morn":3.37},"feels_like":{"day":-0.34,"night":-0.77,"eve":-1.82,"morn":-0.83},"pressure":1005,"humidity":76,"dew_point":3.77,"wind_speed":9.73,"wind_deg":155,"weather":[{"id":501,"main":"Rain","description":"pluie modérée","icon":"10d"}],"clouds":100,"pop":1,"rain":8.07,"uvi":1.13},{"dt":1617033600,"sunrise":1617014378,"sunset":1617059880,"temp":{"day":-0.53,"min":-2.96,"max":4.25,"night":1.21,"eve":3.75,"morn":-1.97},"feels_like":{"day":-10.04,"night":-3.35,"eve":-4.16,"morn":-11.27},"pressure":1013,"humidity":34,"dew_point":-14.45,"wind_speed":8.81,"wind_deg":293,"weather":[{"id":616,"main":"Snow","description":"pluie et neige","icon":"13d"}],"clouds":21,"pop":1,"rain":0.34,"snow":0.13,"uvi":3.81},{"dt":1617120000,"sunrise":1617100664,"sunset":1617146357,"temp":{"day":6.12,"min":-0.21,"max":12.23,"night":7.7,"eve":12.23,"morn":-0.21},"feels_like":{"day":1.01,"night":2.81,"eve":6.7,"morn":-4.2},"pressure":1025,"humidity":35,"dew_point":-8.22,"wind_speed":3.14,"wind_deg":178,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02d"}],"clouds":14,"pop":0,"uvi":4.82},{"dt":1617206400,"sunrise":1617186949,"sunset":1617232834,"temp":{"day":6.7,"min":3.71,"max":11.38,"night":3.71,"eve":5.99,"morn":5.39},"feels_like":{"day":2.4,"night":-0.41,"eve":0.79,"morn":0.67},"pressure":1012,"humidity":75,"dew_point":2.64,"wind_speed":3.89,"wind_deg":170,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"clouds":100,"pop":0.97,"rain":1.85,"uvi":0.18},{"dt":1617292800,"sunrise":1617273235,"sunset":1617319311,"temp":{"day":0.33,"min":-2.41,"max":3.5,"night":-2.41,"eve":0.91,"morn":2.09},"feels_like":{"day":-7.25,"night":-10.39,"eve":-6.23,"morn":-1.99},"pressure":1019,"humidity":55,"dew_point":-7.49,"wind_speed":6.73,"wind_deg":15,"weather":[{"id":600,"main":"Snow","description":"légères chutes de neige","icon":"13d"}],"clouds":100,"pop":0.25,"snow":0.4,"uvi":1},{"dt":1617379200,"sunrise":1617359522,"sunset":1617405789,"temp":{"day":-3.3,"min":-5.69,"max":-0.25,"night":-3.28,"eve":-0.65,"morn":-5.09},"feels_like":{"day":-12.89,"night":-11.75,"eve":-10.19,"morn":-13.59},"pressure":1016,"humidity":21,"dew_point":-22.44,"wind_speed":8.46,"wind_deg":320,"weather":[{"id":600,"main":"Snow","description":"légères chutes de neige","icon":"13d"}],"clouds":49,"pop":0.4,"snow":0.11,"uvi":1}]}';
    //sample data with alerts
    //var sampleData = '{"lat":45.4973,"lon":-73.5707,"timezone":"America/Toronto","timezone_offset":-18000,"current":{"dt":1605921678,"sunrise":1605873658,"sunset":1605907167,"temp":12.39,"feels_like":9.32,"pressure":1017,"humidity":58,"dew_point":4.37,"uvi":1.23,"clouds":38,"visibility":10000,"wind_speed":2.6,"wind_deg":200,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03n"}]},"minutely":[{"dt":1605921720,"precipitation":0},{"dt":1605921780,"precipitation":0},{"dt":1605921840,"precipitation":0},{"dt":1605921900,"precipitation":0},{"dt":1605921960,"precipitation":0},{"dt":1605922020,"precipitation":0},{"dt":1605922080,"precipitation":0},{"dt":1605922140,"precipitation":0},{"dt":1605922200,"precipitation":0},{"dt":1605922260,"precipitation":0},{"dt":1605922320,"precipitation":0},{"dt":1605922380,"precipitation":0},{"dt":1605922440,"precipitation":0},{"dt":1605922500,"precipitation":0},{"dt":1605922560,"precipitation":0},{"dt":1605922620,"precipitation":0},{"dt":1605922680,"precipitation":0},{"dt":1605922740,"precipitation":0},{"dt":1605922800,"precipitation":0},{"dt":1605922860,"precipitation":0},{"dt":1605922920,"precipitation":0},{"dt":1605922980,"precipitation":0},{"dt":1605923040,"precipitation":0},{"dt":1605923100,"precipitation":0},{"dt":1605923160,"precipitation":0},{"dt":1605923220,"precipitation":0},{"dt":1605923280,"precipitation":0},{"dt":1605923340,"precipitation":0},{"dt":1605923400,"precipitation":0},{"dt":1605923460,"precipitation":0},{"dt":1605923520,"precipitation":0},{"dt":1605923580,"precipitation":0},{"dt":1605923640,"precipitation":0},{"dt":1605923700,"precipitation":0},{"dt":1605923760,"precipitation":0},{"dt":1605923820,"precipitation":0},{"dt":1605923880,"precipitation":0},{"dt":1605923940,"precipitation":0},{"dt":1605924000,"precipitation":0},{"dt":1605924060,"precipitation":0},{"dt":1605924120,"precipitation":0},{"dt":1605924180,"precipitation":0},{"dt":1605924240,"precipitation":0},{"dt":1605924300,"precipitation":0},{"dt":1605924360,"precipitation":0},{"dt":1605924420,"precipitation":0},{"dt":1605924480,"precipitation":0},{"dt":1605924540,"precipitation":0},{"dt":1605924600,"precipitation":0},{"dt":1605924660,"precipitation":0},{"dt":1605924720,"precipitation":0},{"dt":1605924780,"precipitation":0},{"dt":1605924840,"precipitation":0},{"dt":1605924900,"precipitation":0},{"dt":1605924960,"precipitation":0},{"dt":1605925020,"precipitation":0},{"dt":1605925080,"precipitation":0},{"dt":1605925140,"precipitation":0},{"dt":1605925200,"precipitation":0},{"dt":1605925260,"precipitation":0},{"dt":1605925320,"precipitation":0}],"hourly":[{"dt":1605920400,"temp":12.39,"feels_like":6.63,"pressure":1017,"humidity":58,"dew_point":4.37,"clouds":38,"visibility":10000,"wind_speed":6.44,"wind_deg":240,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03n"}],"pop":0},{"dt":1605924000,"temp":11.53,"feels_like":6.06,"pressure":1017,"humidity":66,"dew_point":5.41,"clouds":53,"visibility":10000,"wind_speed":6.32,"wind_deg":248,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1605927600,"temp":10.75,"feels_like":5.3,"pressure":1018,"humidity":73,"dew_point":6.11,"clouds":69,"visibility":10000,"wind_speed":6.51,"wind_deg":257,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1605931200,"temp":10.05,"feels_like":4.75,"pressure":1019,"humidity":73,"dew_point":5.44,"clouds":61,"visibility":10000,"wind_speed":6.09,"wind_deg":266,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1605934800,"temp":9.05,"feels_like":3.73,"pressure":1020,"humidity":71,"dew_point":4.08,"clouds":56,"visibility":10000,"wind_speed":5.73,"wind_deg":271,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1605938400,"temp":8.26,"feels_like":2.69,"pressure":1020,"humidity":67,"dew_point":2.66,"clouds":61,"visibility":10000,"wind_speed":5.68,"wind_deg":285,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1605942000,"temp":6.77,"feels_like":0.68,"pressure":1021,"humidity":61,"dew_point":-0.34,"clouds":3,"visibility":10000,"wind_speed":5.82,"wind_deg":289,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}],"pop":0},{"dt":1605945600,"temp":6.18,"feels_like":0.81,"pressure":1022,"humidity":63,"dew_point":-0.55,"clouds":1,"visibility":10000,"wind_speed":4.76,"wind_deg":277,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}],"pop":0},{"dt":1605949200,"temp":6.14,"feels_like":1.39,"pressure":1022,"humidity":64,"dew_point":-0.35,"clouds":9,"visibility":10000,"wind_speed":3.91,"wind_deg":259,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}],"pop":0},{"dt":1605952800,"temp":6.75,"feels_like":1.72,"pressure":1024,"humidity":62,"dew_point":0.17,"clouds":31,"visibility":10000,"wind_speed":4.34,"wind_deg":274,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03n"}],"pop":0},{"dt":1605956400,"temp":5.83,"feels_like":1.11,"pressure":1025,"humidity":70,"dew_point":0.94,"clouds":46,"visibility":10000,"wind_speed":4.07,"wind_deg":311,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03n"}],"pop":0},{"dt":1605960000,"temp":4.1,"feels_like":-0.76,"pressure":1026,"humidity":72,"dew_point":-1.44,"clouds":54,"visibility":10000,"wind_speed":4.01,"wind_deg":337,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1605963600,"temp":4.08,"feels_like":-0.87,"pressure":1027,"humidity":70,"dew_point":-3.62,"clouds":100,"visibility":10000,"wind_speed":4.05,"wind_deg":320,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1605967200,"temp":3.58,"feels_like":-1.22,"pressure":1028,"humidity":70,"dew_point":-5.1,"clouds":100,"visibility":10000,"wind_speed":3.75,"wind_deg":315,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1605970800,"temp":3.72,"feels_like":-1.22,"pressure":1028,"humidity":68,"dew_point":-5.72,"clouds":100,"visibility":10000,"wind_speed":3.9,"wind_deg":305,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1605974400,"temp":4.03,"feels_like":-0.99,"pressure":1028,"humidity":66,"dew_point":-6.14,"clouds":97,"visibility":10000,"wind_speed":3.99,"wind_deg":299,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1605978000,"temp":4.36,"feels_like":-0.94,"pressure":1029,"humidity":64,"dew_point":-6.4,"clouds":80,"visibility":10000,"wind_speed":4.37,"wind_deg":297,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}],"pop":0},{"dt":1605981600,"temp":4.42,"feels_like":-0.92,"pressure":1029,"humidity":64,"dew_point":-6.72,"clouds":67,"visibility":10000,"wind_speed":4.44,"wind_deg":301,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}],"pop":0},{"dt":1605985200,"temp":4.17,"feels_like":-0.87,"pressure":1029,"humidity":65,"dew_point":-6.9,"clouds":0,"visibility":10000,"wind_speed":4,"wind_deg":307,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"pop":0},{"dt":1605988800,"temp":3.8,"feels_like":-0.77,"pressure":1029,"humidity":66,"dew_point":-6.82,"clouds":0,"visibility":10000,"wind_speed":3.31,"wind_deg":310,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"pop":0},{"dt":1605992400,"temp":3.2,"feels_like":-1.03,"pressure":1030,"humidity":70,"dew_point":-6.69,"clouds":0,"visibility":10000,"wind_speed":2.86,"wind_deg":309,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"pop":0},{"dt":1605996000,"temp":2.7,"feels_like":-1.45,"pressure":1031,"humidity":72,"dew_point":-6.82,"clouds":0,"visibility":10000,"wind_speed":2.73,"wind_deg":314,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}],"pop":0},{"dt":1605999600,"temp":2.33,"feels_like":-1.73,"pressure":1032,"humidity":74,"dew_point":-6.95,"clouds":0,"visibility":10000,"wind_speed":2.6,"wind_deg":319,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}],"pop":0},{"dt":1606003200,"temp":1.88,"feels_like":-2,"pressure":1033,"humidity":76,"dew_point":-6.88,"clouds":6,"visibility":10000,"wind_speed":2.34,"wind_deg":328,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}],"pop":0},{"dt":1606006800,"temp":1.42,"feels_like":-2.3,"pressure":1033,"humidity":79,"dew_point":-6.79,"clouds":40,"visibility":10000,"wind_speed":2.12,"wind_deg":346,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03n"}],"pop":0},{"dt":1606010400,"temp":0.98,"feels_like":-2.82,"pressure":1033,"humidity":81,"dew_point":-7.01,"clouds":22,"visibility":10000,"wind_speed":2.22,"wind_deg":16,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}],"pop":0},{"dt":1606014000,"temp":0.59,"feels_like":-3.32,"pressure":1033,"humidity":83,"dew_point":-7.22,"clouds":14,"visibility":10000,"wind_speed":2.37,"wind_deg":30,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}],"pop":0},{"dt":1606017600,"temp":0.27,"feels_like":-3.63,"pressure":1034,"humidity":85,"dew_point":-7.28,"clouds":11,"visibility":10000,"wind_speed":2.35,"wind_deg":42,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}],"pop":0},{"dt":1606021200,"temp":0.02,"feels_like":-3.75,"pressure":1034,"humidity":86,"dew_point":-7.26,"clouds":9,"visibility":10000,"wind_speed":2.15,"wind_deg":52,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}],"pop":0},{"dt":1606024800,"temp":-0.2,"feels_like":-3.97,"pressure":1034,"humidity":87,"dew_point":-7.21,"clouds":7,"visibility":10000,"wind_speed":2.14,"wind_deg":61,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}],"pop":0},{"dt":1606028400,"temp":-0.38,"feels_like":-4.02,"pressure":1034,"humidity":87,"dew_point":-7.15,"clouds":1,"visibility":10000,"wind_speed":1.92,"wind_deg":73,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}],"pop":0},{"dt":1606032000,"temp":-0.47,"feels_like":-3.95,"pressure":1034,"humidity":87,"dew_point":-7.14,"clouds":50,"visibility":10000,"wind_speed":1.68,"wind_deg":73,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03n"}],"pop":0},{"dt":1606035600,"temp":-0.6,"feels_like":-3.95,"pressure":1034,"humidity":88,"dew_point":-7.17,"clouds":54,"visibility":10000,"wind_speed":1.5,"wind_deg":76,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1606039200,"temp":-0.67,"feels_like":-3.92,"pressure":1034,"humidity":88,"dew_point":-7.23,"clouds":65,"visibility":10000,"wind_speed":1.34,"wind_deg":67,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1606042800,"temp":-0.69,"feels_like":-4.14,"pressure":1034,"humidity":88,"dew_point":-7.28,"clouds":73,"visibility":10000,"wind_speed":1.62,"wind_deg":62,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1606046400,"temp":-0.72,"feels_like":-4.26,"pressure":1034,"humidity":88,"dew_point":-7.32,"clouds":76,"visibility":10000,"wind_speed":1.74,"wind_deg":66,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04n"}],"pop":0},{"dt":1606050000,"temp":-0.47,"feels_like":-4.16,"pressure":1034,"humidity":87,"dew_point":-7.35,"clouds":100,"visibility":10000,"wind_speed":1.98,"wind_deg":73,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1606053600,"temp":0.12,"feels_like":-3.62,"pressure":1034,"humidity":86,"dew_point":-7.4,"clouds":100,"visibility":10000,"wind_speed":2.13,"wind_deg":84,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1606057200,"temp":0.9,"feels_like":-3.19,"pressure":1033,"humidity":81,"dew_point":-7.34,"clouds":100,"visibility":10000,"wind_speed":2.61,"wind_deg":91,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1606060800,"temp":1.75,"feels_like":-2.47,"pressure":1032,"humidity":76,"dew_point":-7.27,"clouds":100,"visibility":10000,"wind_speed":2.79,"wind_deg":96,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1606064400,"temp":2.39,"feels_like":-1.97,"pressure":1031,"humidity":73,"dew_point":-7.34,"clouds":100,"visibility":10000,"wind_speed":3.01,"wind_deg":99,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1606068000,"temp":2.81,"feels_like":-1.63,"pressure":1030,"humidity":70,"dew_point":-7.48,"clouds":100,"visibility":10000,"wind_speed":3.09,"wind_deg":101,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1606071600,"temp":2.97,"feels_like":-1.44,"pressure":1029,"humidity":69,"dew_point":-7.53,"clouds":100,"visibility":10000,"wind_speed":3.04,"wind_deg":96,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1606075200,"temp":3.12,"feels_like":-1.1,"pressure":1028,"humidity":69,"dew_point":-7.15,"clouds":100,"visibility":10000,"wind_speed":2.8,"wind_deg":103,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1606078800,"temp":2.98,"feels_like":-0.89,"pressure":1027,"humidity":71,"dew_point":-6.78,"clouds":100,"visibility":10000,"wind_speed":2.35,"wind_deg":98,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"pop":0},{"dt":1606082400,"temp":2.82,"feels_like":-1.31,"pressure":1027,"humidity":72,"dew_point":-6.53,"clouds":100,"visibility":8386,"wind_speed":2.72,"wind_deg":90,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0.01},{"dt":1606086000,"temp":2.15,"feels_like":-2.17,"pressure":1026,"humidity":79,"dew_point":-3.89,"clouds":100,"visibility":10000,"wind_speed":3.11,"wind_deg":104,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0.49},{"dt":1606089600,"temp":0.47,"feels_like":-4.22,"pressure":1025,"humidity":96,"dew_point":-0.11,"clouds":100,"visibility":47,"wind_speed":3.84,"wind_deg":103,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04n"}],"pop":0.61}],"daily":[{"dt":1605888000,"sunrise":1605873658,"sunset":1605907167,"temp":{"day":6.13,"min":2.57,"max":12.39,"night":11.37,"eve":10.63,"morn":3.38},"feels_like":{"day":3.25,"night":5.83,"eve":6.67,"morn":-0.03},"pressure":1018,"humidity":83,"dew_point":3.48,"wind_speed":2.09,"wind_deg":181,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"clouds":100,"pop":0.01,"uvi":1.23},{"dt":1605974400,"sunrise":1605960138,"sunset":1605993519,"temp":{"day":3.72,"min":0.59,"max":9.15,"night":0.59,"eve":3.2,"morn":6.54},"feels_like":{"day":-1.22,"night":-3.32,"eve":-1.03,"morn":1.85},"pressure":1028,"humidity":68,"dew_point":-5.72,"wind_speed":3.9,"wind_deg":305,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"clouds":100,"pop":0,"uvi":1.22},{"dt":1606060800,"sunrise":1606046617,"sunset":1606079872,"temp":{"day":0.9,"min":-0.72,"max":2.98,"night":0.33,"eve":2.98,"morn":-0.6},"feels_like":{"day":-3.19,"night":-4.59,"eve":-0.89,"morn":-3.95},"pressure":1033,"humidity":81,"dew_point":-7.34,"wind_speed":2.61,"wind_deg":91,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"clouds":100,"pop":0.89,"uvi":1.18},{"dt":1606147200,"sunrise":1606133095,"sunset":1606166228,"temp":{"day":1.87,"min":0.68,"max":5.86,"night":0.68,"eve":2.13,"morn":4.17},"feels_like":{"day":-6.44,"night":-5.55,"eve":-4.68,"morn":-0.18},"pressure":1010,"humidity":84,"dew_point":-1.65,"wind_speed":8.92,"wind_deg":260,"weather":[{"id":501,"main":"Rain","description":"pluie modérée","icon":"10d"}],"clouds":99,"pop":1,"rain":6.53,"uvi":1.11},{"dt":1606233600,"sunrise":1606219573,"sunset":1606252586,"temp":{"day":-4.24,"min":-5.24,"max":-2.64,"night":-3.33,"eve":-3.21,"morn":-4.19},"feels_like":{"day":-8.69,"night":-9.02,"eve":-7.26,"morn":-10.11},"pressure":1034,"humidity":79,"dew_point":-14.44,"wind_speed":2.3,"wind_deg":328,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"clouds":0,"pop":0,"uvi":1.05},{"dt":1606320000,"sunrise":1606306049,"sunset":1606338947,"temp":{"day":4.21,"min":-2.74,"max":7.19,"night":4.87,"eve":5.18,"morn":-1.52},"feels_like":{"day":-3.77,"night":-1.26,"eve":0.13,"morn":-6.51},"pressure":1015,"humidity":71,"dew_point":-2.18,"wind_speed":8.44,"wind_deg":171,"weather":[{"id":600,"main":"Snow","description":"légères chutes de neige","icon":"13d"}],"clouds":100,"pop":1,"rain":5.99,"snow":0.19,"uvi":1.29},{"dt":1606406400,"sunrise":1606392525,"sunset":1606425310,"temp":{"day":2.45,"min":0.33,"max":4.39,"night":0.48,"eve":3.03,"morn":1.31},"feels_like":{"day":-0.16,"night":-2.66,"eve":-0.16,"morn":-3.04},"pressure":1020,"humidity":80,"dew_point":-2.42,"wind_speed":0.76,"wind_deg":324,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"clouds":0,"pop":0,"uvi":1.18},{"dt":1606492800,"sunrise":1606478999,"sunset":1606511675,"temp":{"day":2.12,"min":-0.18,"max":4.46,"night":1.35,"eve":3.33,"morn":-0.18},"feels_like":{"day":-1.22,"night":-0.91,"eve":0.71,"morn":-2.54},"pressure":1023,"humidity":82,"dew_point":-2.2,"wind_speed":1.81,"wind_deg":256,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"clouds":0,"pop":0,"uvi":1.07}],"alerts":[{"sender_name":"Environment Canada","event":"weather","start":1605905407,"end":1605963007,"description":"\\nPossible significant snowfall on Sunday.\\n\\nA developing low pressure system over the American Midwest will affect Southwestern Quebec beginning Sunday afternoon. This system will intensify as it approaches the province.\\nDepending on its track, which is still uncertain, this low pressure system could give significant snowfall amounts and cause strong winds over Southern and Central Quebec Sunday night, especially over regions along the northern banks of the St-Lawrence River. It will then spread to eastern Quebec on Monday.\\n\\nIf the expected track remains the unchanged, precipitation is expected to begin as snow, then gradually change to rain with a risk of freezing rain during the changeover on Monday morning over most areas.\\n\\nFuture weather statements will provide more details as the low pressure system&apos;s track as well as precipitation types and amounts become more certain.\\n\\n###\\n\\nPlease continue to monitor alerts and forecasts issued by Environment Canada.To report severe weather, send an email to QCstorm@canada.ca or tweet reports using #QCStorm.\\n"}]}';
    //var data = $.parseJSON(sampleData);
    //showData(data);    
		
	$.ajax({
            type: 'GET',
            url: url,
            cache: false,
            success: function (data) {
                showData(data);
            },
            error: function (xhr, status, error) {
                showError(xhr.responseText);				
            }
        });
}

function showError(error) {
    var divAlerts = $("#alerts");

    if (error != null && error != '') {
        hasAlerts = true;
        divAlerts.text(error);
        divAlerts.show();     
    }
    else {
        hasAlerts = false;
        divAlerts.hide();     
    }
}

function showData(data) {
    showAlerts(data.alerts);
    showCurrent(data.current);
    if (forecastNbOfDays > 0) { showForecast(data.daily); }
    if (hourlyNbOfHours > 0) { showHourlyForecast(data.hourly); }
}

function showAlerts(alerts) {
    var divAlerts = $("#alerts");

    if (alerts != null && alerts.length > 0) {
        hasAlerts = true;
        var alertMessages = [];
        $.each(alerts, function (index, alert) {            
            alertMessages.push(alert.description);
        });

        divAlerts.text(alertMessages.join(" | "));
        divAlerts.show();     
    }
    else {
        hasAlerts = false;
        divAlerts.hide();     
    }
}

function showCurrent(current) {	
    $("#currentSummary").html(getSummary(current));
    $("#currentIcon").attr('class', getIconClass(current.weather[0]));
    $("#currentTemp").text(getTemp(current.temp));
	$("#currentApparentTemp").text(getTemp(current.feels_like));	
    $("#currentWind").html(getWind(current.wind_speed, current.wind_deg, showCurrentWindBearing));
    $("#currentHumidity").html(current.humidity);
}

function showDateTime() {
	var now = new Date();
	$("#currentDate").text(labels.week[now.getDay()] + ', ' + now.getDate() + ' ' + labels.month[now.getMonth()]);
	$("#currentTime").text(now.getHours() + (now.getMinutes() < 10 ? ":0" : ":") + now.getMinutes());
}

function showForecast(days) {
    var i = 0;
    var now = (new Date()).setHours(0, 0, 0, 0);
    var titles = [];
    var icons = [];
    var summaries = [];
    var maxTemps = [];
    var minTemps = [];
    var winds = [];
    var humidities = [];
    var precipitations = [];
    var accumulations = [];
    
    $.each(days, function (index, day) {
        if (i >= forecastNbOfDays) { return false; }
        
        var dateTime = new Date(0);
        dateTime.setUTCSeconds(day.dt);
        var dayDate = dateTime.setHours(0, 0, 0, 0);
        if (dayDate >= now || debugging) {
            titles.push('<th>' + (dayDate == now ? labels.todayLabel : labels.week[dateTime.getDay()]) + '</th>');
            icons.push('<td><i class="' + getIconClass(day.weather[0]) + '"></i></td>');
            summaries.push('<td>' + getSummary(day) + '</td>');
            maxTemps.push('<td>' + getTemp(day.temp.max) + '</td>');
            minTemps.push('<td>' + getTemp(day.temp.min) + '</td>');
            winds.push('<td>' + getWind(day.wind_speed, day.wind_deg, showForecastWindBearing) + '</td>');
            humidities.push('<td>' + day.humidity + '%' + '</td>');
            precipitations.push('<td>' + getProbability(day.pop) + '%' + '</td>');
            accumulations.push('<td>' + getAccumulationStr(day.rain, day.snow) + '</td>');
			
            i++;
        }
    });

    $("#forecastTitles").html('<th></th>' + titles.join(""));
    $("#forecastIcons").html('<td></td>' + icons.join(""));
    $("#forecastSummaries").html('<td></td>' + summaries.join(""));
    $("#forecastMaxTemps").html('<td><div class="vertical">max</div></td>' + maxTemps.join(""));
    $("#forecastMinTemps").html('<td><div class="vertical">min</div></td>' + minTemps.join(""));
    $("#forecastWind").html('<td><div class="vertical">wind</div></td>' + winds.join(""));
    $("#forecastHumidity").html('<td><div class="vertical">rh</div></td>' + humidities.join(""));
    $("#forecastPrecipitations").html('<td><div class="vertical">prob</div></td>' + precipitations.join(""));
    $("#forecastAccumulations").html('<td><div class="vertical">acc</div></td>' + accumulations.join(""));

    var width = Math.floor(100 / forecastNbOfDays);
    $("#forecast td").css('width', width + '%');
    $("#forecastSummaries td").css('fontSize', hasAlerts ?'14px': '16px');
}

function showHourlyForecast(hourlyForecasts) {
    var hours = [];
    var icons = [];
    var temps = [];
    var winds = [];
    var humidities = [];
	var accumulations = [];
    var precipitations = [];
    var i = 0;
    var now = new Date();
    now = now.setHours(now.getHours(), 0, 0, 0);

    $.each(hourlyForecasts, function (index, hourly) {
        var dateTime = new Date(0);
        dateTime.setUTCSeconds(hourly.dt);
        var dayDate = dateTime.setHours(dateTime.getHours(), 0, 0, 0);
        if (dayDate >= now || debugging) {
            hours.push("<th>" + dateTime.getHours() + "h</th>");
            if (showHourlyIcon){icons.push('<td><i class="' + getIconClass(hourly.weather[0]) + '"></i></td>');}
            temps.push('<td>' + Math.round(hourly.temp) + '°</td>');
            winds.push('<td>' + getWind(hourly.wind_speed, hourly.wind_deg, showHourlyWindBearing) + '</td>');
            humidities.push('<td><span style="font-size:12px">rh</span> ' + hourly.humidity + '<span>%</span></td>');
            accumulations.push('<td>' + getAccumulationStr(hourly.rain, hourly.snow) + '</td>');
            precipitations.push('<td>' + getProbability(hourly.pop) + '<span>%</span></td>');
        }
        i++;

        if (i >= hourlyNbOfHours) {
            return false;
        }
    });

    $("#hourlyHours").html(hours.join(""));
    $("#hourlyIcons").html(icons.join(""));
    $("#hourlyTemp").html(temps.join(""));	
    $("#hourlyWind").html(winds.join(""));	
    $("#hourlyHumidity").html(humidities.join(""));	
	$("#hourlyAcc").html(accumulations.join(""));	
	$("#hourlyPrec").html(precipitations.join(""));	
}

function hideUnwantedData()
{
	if (forecastNbOfDays == 0) { $("#forecast").remove(); }
	if (hourlyNbOfHours == 0) { $("#tableHourlyForecast").remove(); }
	if (!showScrollingAlerts) { $("#alerts").remove(); }
	if (!showCurrentWeather) { $("#header").remove(); }
    if (!showCurrentIcon) { $("#currentIcon").remove(); }
    if (!showCurrentWind) { $("#windLabel").remove(); $("#currentWind").remove(); }
    if (!showCurrentHumidity) { $("#currentHumidity").remove(); $("#humidityLabel").remove(); }
	if (!showCurrentSummary) { $("#currentSummary").remove(); }
	if (!showCurrentDate) { $("#currentDate").remove(); }
	if (!showCurrentTime) { $("#currentTime").remove(); }
	if (!showForecastIcon) { $("#forecastIcons").remove(); }
	if (!showForecastSummary) { $("#forecastSummaries").remove(); }
    if (!showForecastMinTemp) { $("#forecastMinTemps").remove(); }
    if (!showForecastWind) { $("#forecastWind").remove(); }
    if (!showForecastHumidity) { $("#forecastHumidity").remove(); }
	if (!showForecastAccumulation) { $("#forecastAccumulations").remove(); }
	if (!showForecastProbability) { $("#forecastPrecipitations").remove(); }
    if (!showHourlyIcon) { $("#hourlyIcons").remove(); }
    if (!showHourlyWind) { $("#hourlyWind").remove(); }
    if (!showHourlyHumidity) { $("#hourlyHumidity").remove(); }
	if (!showHourlyAccumulation) { $("#hourlyAcc").remove(); }
	if (!showHourlyProbability) { $("#hourlyPrec").remove(); }
}

function getIconClass(weather) {
    var lastCar = weather.icon.slice(-1);
    var iconName = weather.icon.replace(lastCar, '');
    var className = iconMappingById[weather.id] ?? iconMappingByName[iconName] ?? 'icon-unknown';    
    
    if (lastCar == 'n') { 
        className = className + 'night';
    }

    return 'icon ' + className;    
}

function getTemp(temp) {
    return Math.round(temp) + '°' + degreeSymbol;
}

function getProbability(probability) {
    return (probability === null || probability === undefined) ? 0 : Math.round(probability * 100);
}

function getAccumulationStr(rain, snow)
{
	var accumulationStr = '';
    var separator = '';    

    if (rain !== null && rain !== undefined) {
		if (rain["1h"] !== null && rain["1h"] !== undefined)
        {
            rain = rain["1h"];
        }
		
		if (units = 'imperial') { rain = rain / 25.4; } // convert mm to in

        if (rain > 1) { rain = Math.round(rain); }
        else { rain = Math.round(rain * 10) / 10; }
        accumulationStr = rain + '<span style="font-size:14px">' + rainPrecUnit + '</span>';
        separator = ' / '
    }

    if (snow !== null && snow !== undefined) {
		if (snow["1h"] !== null && snow["1h"] !== undefined)
        {
            snow = snow["1h"];
        }
		
		if (units = 'imperial') 
			{ snow = snow / 25.4; } // convert mm to in
		else
			{ snow = snow / 10 } // convert mm to cm

        if (snow > 1) { snow = Math.round(snow); }
        else { snow = Math.round(snow * 10) / 10; }
        accumulationStr = accumulationStr + separator + snow + '<span style="font-size:14px">' + snowPrecUnit + '</span>';
    }

    if (accumulationStr == '') { accumulationStr = '--'; }
    
    return accumulationStr;
}

function getWind(speed, deg, showWindBearing) {
	if (units != 'imperial')
	{
		speed = speed * 3.6; // convert m/s to km/h
	}
    var strWind = '<span>' + Math.round(speed) + '</span>' + windUnit;
    if (showWindBearing)
    {
        strWind = strWind + '<span class="windContainer"><span class="wind" style="transform: rotate(' + deg + 'deg);">↑</span></span>'
    }
    return strWind;
}

function getSummary(data)
{
	var description = data.weather[0].description;
	var separator = '<br/>';
	if (description === null || description === undefined) { 
		description= ''; 
		separator = '';
	}
	
	if(!showDetailedSummary) { return description; }
	
	var summary = data.summary;
	if (summary !== null && summary !== undefined) { return description + separator + summary; }
	
	return description;
}