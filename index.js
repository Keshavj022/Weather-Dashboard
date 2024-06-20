const apiKey = '5bd7affa5bf8cf89b8b0a850a461e125';

async function fetchWeather() {
    const cityInput = document.getElementById('cityInput').value.trim();
    if (cityInput === '') {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherContainer');
    const animationContainer = document.getElementById('animationContainer');
    
    weatherContainer.innerHTML = `
        <div class="weather-info">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity} %</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        </div>
    `;

    let weatherImage = '';
    const weatherMain = data.weather[0].main.toLowerCase();
    const weatherDescription = data.weather[0].description.toLowerCase();

    if (weatherMain.includes('rain')) {
        if (weatherDescription.includes('thunderstorm')) {
            weatherImage = 'url(thunderstorm.png)';
        } else {
            weatherImage = 'url(rainy.png)';
        }
    } else if (weatherMain.includes('cloud')) {
        weatherImage = 'url(cloudy.png)';
    } else {
        weatherImage = 'url(sunny.png)';
    }

    document.body.style.backgroundImage = weatherImage;
    document.body.style.animation = 'fadeIn 1s ease-in-out';

    if (data.main.temp > 30) {
        document.body.style.backgroundColor = '#FF5733';
    } else if (data.main.temp < 10) {
        document.body.style.backgroundColor = '#3498DB';
    } else {
        document.body.style.backgroundColor = '#2ECC71';
    }
}
