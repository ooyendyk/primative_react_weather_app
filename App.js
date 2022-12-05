import React, { useState, useEffect } from 'react';

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Get the current location of the user
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      const apiKey = 'your-api-key';

      // Call the OpenWeather API to get the current weather for the user's location
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const data = await response.json();

      // Call the OpenWeather API to get the five-day forecast for the user's location
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();

      // Set the weather data in the state
      setWeather({
        current: data,
        forecast: forecastData,
      });
    });
  }, []);

  if (!weather) {
    // Display a loading message while the weather data is being fetched
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <h1>Current weather:</h1>
      <p>{weather.current.weather[0].main}: {weather.current.weather[0].description}</p>
      <p>Temperature: {weather.current.main.temp}</p>

      <h1>Five-day forecast:</h1>
      {weather.forecast.list.map(item => (
        <div key={item.dt}>
          <p>{item.weather[0].main}: {item.weather[0].description}</p>
          <p>Temperature: {item.main.temp}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
