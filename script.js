const apiKey = "134f33d0c3c1f24b18868648d2ef96d5"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML = `<p>Failed to retrieve data. Check your internet connection.</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Condition: ${weather[0].description}</p>
    `;
}
