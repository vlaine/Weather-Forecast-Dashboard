var hasAlerts;
function showData(data) {
    showAlerts(data.alerts);
    showCurrent(data.currently, data.daily.summary);
    showDateTime();
    if (forecastNbOfDays > 0) { showForecast(data.daily.data); }
    if (hourlyNbOfHours > 0) { showHourlyForecast(data.hourly.data); }
    
}

function showAlerts(alerts) {
    var divAlerts = $("#alerts");

    if (alerts != null && alerts.length > 0) {
        hasAlerts = true;
        var alertMessages = [];
        $.each(alerts, function (index, alert) {
            alertMessages.push(alert.title + ": " + alert.description);
        });

        divAlerts.text(alertMessages.join(" | "));
        divAlerts.show();     
    }
    else {
        hasAlerts = false;
        divAlerts.hide();     
    }
}

function showCurrent(current, summary) {
    $("#currentSummary").html(summary);
    setIcon(current.icon, "#currentIcon", true);
    $("#currentTemp").text(getTemp(current.temperature));
    $("#currentApparentTemp").text(getTemp(current.apparentTemperature));
    $("#currentPrec").text(getProbability(current.precipProbability));
    $("#currentWind").html('<span >' + Math.ceil(current.windSpeed)+'</span> ' + windUnit );
}

function showDateTime() {
    var now = new Date();
    $("#currentDate").text(week[now.getDay()] + ', ' + now.getDate() + ' ' + month[now.getMonth()]);
    $("#currentTime").text(now.getHours() + (now.getMinutes() < 10 ? ":0" : ":") + now.getMinutes());    
    var t = setTimeout(showDateTime, 500);
}

function showForecast(days) {
    var i = 0;
    var now = (new Date()).setHours(0, 0, 0, 0);
    var titles = [];
    var icons = [];
    var summaries = [];
    var maxTemps = [];
    var minTemps = [];
    var precipitations = [];
    var accumulations = [];
    
    $.each(days, function (index, day) {
        if (i >= forecastNbOfDays)
        { return false; }

        var dateTime = new Date(0);
        dateTime.setUTCSeconds(day.time);
        var dayDate = dateTime.setHours(0, 0, 0, 0);
        if (dayDate >= now || debugging) {
            titles.push('<th>' + (dayDate == now ? todayLabel : week[dateTime.getDay()]) + '</th>');
            icons.push('<td><i class="' + getIconClass(day.icon, false) + '"></i></td>');
            summaries.push('<td>' + day.summary + '</td>');
            maxTemps.push('<td>' + getTemp(day.temperatureMax) + '</td>');
            minTemps.push('<td>' + getTemp(day.apparentTemperatureMin) + '</td>');
            precipitations.push('<td>' + getProbability(day.precipProbability) + '%' + '</td>');
            var precMult = (day.precipType == 'snow' || units == 'us') ? 1 : 10;
            var precVal = day.precipAccumulation == null ? 0 : Math.ceil(day.precipAccumulation * precMult);
            accumulations.push('<td>' + precVal + (day.precipType == 'snow' ? snowPrecUnit : rainPrecUnit) + '</td>');
            i++;
        }
    });

    $("#forecastTitles").html('<th></th>' + titles.join(""));
    $("#forecastIcons").html('<td></td>' + icons.join(""));
    $("#forecastSummaries").html('<td></td>' + summaries.join(""));
    $("#forecastMaxTemps").html('<td><div class="vertical">max</div></td>' + maxTemps.join(""));
    $("#forecastMinTemps").html('<td><div class="vertical">min</div></td>' + minTemps.join(""));
    $("#forecastPrecipitations").html('<td><div class="vertical">préc</div></td>' + precipitations.join(""));
    $("#forecastAccumulations").html('<td><div class="vertical">acc</div></td>' + accumulations.join(""));

    var width = Math.floor(100 / forecastNbOfDays);
    $("#forecast td").css('width', width + '%');
    $("#forecastSummaries td").css('fontSize', hasAlerts ?'14px': '16px');
}

function showHourlyForecast(hourlyForecasts) {
    var hours = [];
    var icons = [];
    var temps = [];
    var precipitations = [];
    var i = 0;
    var now = new Date();
    now = now.setHours(now.getHours(), 0, 0, 0);

    $.each(hourlyForecasts, function (index, hourly) {
        var dateTime = new Date(0);
        dateTime.setUTCSeconds(hourly.time);
        var dayDate = dateTime.setHours(dateTime.getHours(), 0, 0, 0);
        if (dayDate >= now || debugging) {
            hours.push("<th>" + dateTime.getHours() + "h</th>");
            icons.push('<td><i class="' + getIconClass(hourly.icon, true) + '"></i></td>');
            temps.push('<td>' + Math.ceil(hourly.temperature) + '°</td>');
            precipitations.push('<td>' + getProbability(hourly.precipProbability) + '<span>%</span></td>');
        }
        i++;

        if (i >= hourlyNbOfHours) {
            return false;
        }
    });

    $("#hourlyHours").html(hours.join(""));
    $("#hourlyIcons").html(icons.join(""));
    $("#hourlyTemp").html(temps.join(""));
    $("#hourlyPrec").html(precipitations.join(""));
}

function setIcon(icon, id, keepNight) {
    $(id).attr('class', getIconClass(icon, keepNight));
}

function getIconClass(icon, keepNight) {
    return 'icon icon-' + (keepNight ? icon.replace(/-|day/ig, "") : icon.replace(/-|day|night/ig, ""));
}

function getTemp(temp) {
    return Math.ceil(temp) + '°' + degreeSymbol;
}

function getProbability(probability) {
    return probability == null ? 0 : Math.ceil(probability * 100);
}