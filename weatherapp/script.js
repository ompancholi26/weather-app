const API_KEY = "c8b985bbdcb9faa3ec30554322728db4";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city.trim()) {
        alert("Please enter a city name");
        return;
    }
    
    try {
        const response = await fetch(API_URL + encodeURIComponent(city) + `&appid=${API_KEY}`);
        
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "clouds.png";
            }
            else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "clear.png";
            }
            else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "rain.png";
            }
            else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "drizzle.png";
            }
            else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "mist.png";
            }
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Allow pressing Enter to search
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
