const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-button");
const weatherIcon = document.querySelector(".weatherIcon")

const city = document.getElementById("weatherCity");
const country = document.getElementById("weatherCountry");
const weatherMain = document.getElementById("weatherMain");
const temprature = document.getElementById("weatherTemp");
const feelsLike = document.getElementById("weatherFeels");
const sunrise = document.getElementById("weatherSunrise");
const sunset = document.getElementById("weatherSunset");
const windSpeed = document.getElementById("weatherWind");

let currentTime = document.querySelector('.showtime');


setInterval(() => {
    const date = new Date();
    let currentHour = (date.getHours() % 12) < 10 ? `0${date.getHours() % 12}` : date.getHours() % 12;
    let currentMin = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let currentSeconds = (date.getSeconds()) < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    currentTime.innerHTML = `${currentHour}:${currentMin}:${currentSeconds}`;
}, 1000);

const getWeather = async () => {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&limit=5&appid=aba30f613d104eed227c215feb6c904f&units=metric`);
        const data = await res.json();
        const { clouds, main, sys, weather, wind, name } = data;

        let sunriseTime = new Date(sys.sunrise * 1000);
        let sunsetTime = new Date(sys.sunset * 1000)

        city.textContent = `${name},`;
        country.textContent = sys.country;
        temprature.textContent = `${main.temp} °C`;
        feelsLike.textContent = `${main.feels_like} °C`;
        sunrise.textContent = `↑${sunriseTime.getHours() % 12}:${sunriseTime.getMinutes()}:${sunriseTime.getSeconds()} AM`;
        sunset.textContent = `↓${sunsetTime.getHours() % 12}:${sunsetTime.getMinutes()}:${sunsetTime.getSeconds()} PM`;
        weatherMain.textContent = weather[0].main;
        windSpeed.textContent = wind.speed;
        weatherIcon.style.backgroundImage = `url("https://openweathermap.org/img/wn/${weather[0].icon}.png")`;


        userInput.value = "";
    }
    catch (err) {
        alert("Enter correct city name.");
    }
}

// searchBtn.addEventListener('click',getWeather);
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
})

window.onload(getWeather(userInput.value='surat'));
