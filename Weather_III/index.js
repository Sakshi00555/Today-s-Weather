
var locationP = document.getElementById('demo');
var locationB = document.getElementById('location');

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);



    } else {
        locationP.innerHTML = "This location is not found";
    }


    function showPosition(position) {
        console.log(position);
        localStorage.setItem("loclatitude", position.coords.latitude);
        localStorage.setItem("loclongitude", position.coords.longitude);

    
       
    }

    try {

        var latitude = localStorage.getItem("loclatitude");
        console.log('latitude', latitude)
        var longitude = localStorage.getItem("loclongitude");
        console.log('longitude', longitude)
        


        var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=89202df6e5a334ae688aa23ab560733a`);

        var data_location = await response.json();

        console.log('data_location', data_location.name);
        var city = data_location.name;

        var respon = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=89202df6e5a334ae688aa23ab560733a`);

        var data = await respon.json();
        console.log('data', data);
        appendData(data);

        var iframe = document.getElementById('gmap_canvas');

        iframe.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

        var res_forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&appid=89202df6e5a334ae688aa23ab560733a`);
        var data_forecast = await res_forecast.json();
        console.log('data_forecast', data_forecast);
        appendForecast(data_forecast);


    }
    catch (err) {
        console.log('error', err)

    }


}






async function showData() {

    console.log(location);

    try {



        var city = document.getElementById('searchInp').value;

        var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=89202df6e5a334ae688aa23ab560733a`);

        var data = await res.json();
        console.log('data', data);
        appendData(data);


        var res_forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&appid=89202df6e5a334ae688aa23ab560733a`);
        var data_forecast = await res_forecast.json();
        console.log('data_forecast', data_forecast);
        appendForecast(data_forecast);


        var iframe = document.getElementById('gmap_canvas');

        iframe.src=`https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed `
    }
    catch (error) {
        console.log('error', error)

    }


}


function appendData(elem) {

    var mainDiv = document.getElementById('curWeather');
    mainDiv.innerHTML = null;

    var name = document.createElement('p');
    name.style.fontSize="30px"
    name.style.color="red"
;    name.innerText = elem.name;

    elem.weather.forEach(function (elem) {
        var sky = elem.main;
        console.log(sky);

        var img = document.createElement('img');
        img.style.height = "40px";

        if (sky == "Clouds") {
            img.src = "https://cdn-icons-png.flaticon.com/128/3445/3445722.png";
        } else if (sky == "Clear") {
            img.src = "https://cdn-icons-png.flaticon.com/128/1163/1163661.png";
        } else if (sky == "Haze") {
            img.src = "https://cdn-icons-png.flaticon.com/128/869/869869.png";
        } else {
            img.src = "https://cdn-icons-png.flaticon.com/128/2948/2948175.png";
        }
        mainDiv.append(img);

    })
    var feel = document.createElement('p');
    feel.setAttribute("id", "temp_p");

    feel.innerText = `Real Feel : ${Math.round(elem.main.feels_like - 273.15)}°C`;

    var temp = document.createElement('p');
    temp.setAttribute("id", "temp_p");

    temp.innerText = `Temperature : ${Math.round(elem.main.temp - 273.15)}°C`;

    var tempMax = document.createElement('p');
    tempMax.setAttribute("id", "temp_p");

    tempMax.innerText = `Maximum Temperature : ${Math.round(elem.main.temp_max - 273.15)}°C`;

    var tempMin = document.createElement('p');
    tempMin.setAttribute("id", "temp_p");

    tempMin.innerText = `Minimum Temperature : ${Math.round(elem.main.temp_min - 273.15)}°C`;

    var humidity = document.createElement('p');
    humidity.setAttribute("id", "temp_p");

    humidity.innerText = `Humidity : ${elem.main.humidity}%`;

    mainDiv.append(name, feel, temp, tempMax, tempMin, humidity);


}

function appendForecast(elem) {

    var mainDiv_forecast = document.getElementById('forecast');
    mainDiv_forecast.innerHTML = null;
    var i = 0;

    elem.daily.forEach(function (element) {
        console.log('element', element);

        var main_div = document.createElement('div');
        main_div.setAttribute("id", "main_div");

        var day = document.createElement('p');
        day.setAttribute("id", 'day');

        if (i == 0) {
            day.innerText = "TODAY";
        } else if (i == 1) {
            day.innerText = "TOMORROW";
        } else {
            day.innerText = `DAY ${i + 1}`;
        }

        i++;

        main_div.append(day);

        element.weather.forEach(function (elem) {
            var sky = elem.main;
            console.log(sky);

            var img = document.createElement('img');
            img.style.height = "41px";

            if (sky == "Clouds") {
                img.src = "https://cdn-icons-png.flaticon.com/128/4064/4064269.png";
            } else if (sky == "Clear") {
                img.src = "https://cdn-icons-png.flaticon.com/128/7093/7093515.png";
            } else if (sky == "Haze") {
                img.src = "https://cdn-icons-png.flaticon.com/128/3208/3208752.png";
            } else {
                img.src = "https://cdn-icons-png.flaticon.com/128/1146/1146858.png";
            }
            main_div.append(img);

        })



        var temp_Max = document.createElement('p');
        temp_Max.setAttribute("id", "details");
        temp_Max.innerText = `Maximum Temp: ${Math.round(element.temp.max - 273.15)}°C`;

        var temp_Min = document.createElement('p');
        temp_Min.setAttribute("id", "details");
        temp_Min.innerText = `Minimum Temp: ${Math.round(element.temp.min - 273.15)}°C`;

        var humidity = document.createElement('p');
        humidity.setAttribute("id", "details");
        humidity.innerText = `Humidity: ${element.humidity}%`;

        var wind = document.createElement('p');
        wind.setAttribute("id", "details");
        wind.innerText = `Wind Speed: ${element.wind_speed}km/h`;

        main_div.append(temp_Max, temp_Min, humidity, wind);

        mainDiv_forecast.append(main_div);
    });
}