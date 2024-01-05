function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    if (!cityName) {
      alert('Please enter a city name.');
      return;
    }
  
    fetch(`/weather?city=${cityName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].icon) {
          displayWeather(data);
        } else if (data.error) {
          console.error('Error from the server:', data.error);
          alert(`Error from the server: ${data.error}`);
        } else {
          console.error('Invalid data received from the API:', data);
          alert('Unable to fetch weather data. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Unable to fetch weather data. Please try again.');
      });
  }
  
  function displayWeather(data) {
    const cityNameElement = document.getElementById('cityName');
    const temperatureElement = document.getElementById('temperature');
    const weatherIconElement = document.getElementById('weatherIcon');
    const weatherInfoElement = document.getElementById('weatherInfo');
  
    cityNameElement.textContent = data.name;
    temperatureElement.textContent = data.main.temp ? `${Math.round(data.main.temp)}°C` : 'Temperature not available';
    weatherIconElement.src = data.weather && data.weather[0] && data.weather[0].icon
      ? `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      : 'C:\Users\Administrator\Desktop\weather-app\assets\default_images\weather.png';
    weatherIconElement.alt = data.weather && data.weather[0] && data.weather[0].description
      ? data.weather[0].description
      : 'Weather icon';
    weatherInfoElement.style.display = 'block';
  }
  
