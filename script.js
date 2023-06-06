function formatDate(timeStamp){
    let date = new Date(timeStamp);
    let hours = date.getHours();
    if(hours <10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes <10){
        minutes = `0${minutes}`;
    }
    let days = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}: ${minutes}`

}

function displyForecast(){
    let forecastElement = document.querySelector("#forecast"); 
    let forecastHTML =  `<div class="row">`;
    let days = ["Thu", "Fri", "Sat","Sun","Mon","Tue"];
    days.forEach(function(day){
        forecastHTML = forecastHTML + `
        <div class="col-2">
           <div class="weather-forcast-date">
            ${day} 
           </div>
            <img src="https://i.pinimg.com/originals/6f/8f/0a/6f8f0a1379f61a433b90c34e95789927.jpg" alt="" width="42">
            <div class="weather-forcast-temperature">
                <span class="weather-forcast-temperature-max">
                    18°
                </span>
                <span class="weather-forcast-temperature-min">
                    12°
                </span>
            </div>
        </div>`;

    })
 
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
                        
}
 
 function displyTemperature(response){
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement =document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTempreture = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTempreture);
    cityElement.innerHTML =response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML =response.data.main.humidity;
    windElement.innerHTML =Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    iconElement.setAttribute("src",` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(city){
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displyTemperature);

}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showTempretureFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTempreture = (celsiusTempreture + 9 ) / 5 + 32;
    
    temperatureElement.innerHTML = Math.round(fahrenheitTempreture);
}

function showTempretureCelsius(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTempreture);
}

let celsiusTempreture = null;



let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",showTempretureFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",showTempretureCelsius);

search("New York");
displyForecast();