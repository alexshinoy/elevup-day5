// Replace with your actual OpenWeatherMap API Key
const API_KEY = "1320bae706fc839c28fecb727459b4f9"; 

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

// DOM Elements for updating
const locationDisplay = document.getElementById('location-display');
const tempDisplay = document.getElementById('temp-display');
const conditionDisplay = document.getElementById('condition-display');
const humidityDisplay = document.getElementById('humidity-display');
const windDisplay = document.getElementById('wind-display');
const weatherIcon = document.getElementById('weather-icon');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

// Allow hitting "Enter" to search
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

async function getWeatherData(city) {
    // API endpoint for current weather (metric units for Celsius)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Hide error, show weather info
            errorMessage.style.display = 'none';
            weatherInfo.style.display = 'block';

            // Update UI with data
            locationDisplay.textContent = `📍 ${data.name}, ${data.sys.country}`;
            tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
            conditionDisplay.textContent = data.weather[0].description;
            humidityDisplay.textContent = `${data.main.humidity}%`;
            windDisplay.textContent = `${data.wind.speed} km/h`;
            
            // Set weather icon
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        } else {
            // Show error, hide weather info
            weatherInfo.style.display = 'none';
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        weatherInfo.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = "Error fetching data. Check your connection.";
    }
}