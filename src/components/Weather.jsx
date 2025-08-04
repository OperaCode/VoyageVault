import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";


const Weather = ({ city, setCity, weather, getWeatherIcon, refreshWeather }) => {

  // Local state to manage manual refresh clicks.
  const [inputCity, setInputCity] = useState(city);

  // Debounce user input changes before updating the city
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputCity.trim() && inputCity !== city) {
        setCity(inputCity);
        localStorage.setItem("city", inputCity);
      }
    }, 800);
    return () => clearTimeout(handler);
  }, [inputCity, city, setCity]);

  return (
    <div id="weather-panel" role="tabpanel" className="p-4">
      <h3 className="text-2xl font-semibold text-amber-600 mb-4">Weather</h3>

      {/* City Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Enter city"
          aria-label="Enter city for weather"
        />
        <button
          onClick={refreshWeather}
          className="bg-amber-600 text-white px-4 py-3 rounded-full hover:bg-amber-700 transition-colors text-sm flex items-center justify-center"
          aria-label="Refresh weather"
        >
          Refresh
        </button>
      </div>
      
      {/* live region for errors and updates */}
      <div className="min-h-8">
        {weather ? (
          weather.error ? (
            <p className="text-sm text-red-500">{weather.error}</p>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600">📍 {city}</p>
              <p className="text-2xl font-semibold text-amber-600">
                {getWeatherIcon(weather.condition)} {weather.temp}
              </p>
              <p className="text-sm text-gray-600">{weather.condition}</p>
              {/* Additional weather details (if available) */}
              {weather.humidity && (
                <p className="text-sm text-gray-600">
                  Humidity: {weather.humidity}%
                </p>
              )}
              {weather.wind && (
                <p className="text-sm text-gray-600">
                  Wind: {weather.wind} km/h
                </p>
              )}
            </div>
          )
        ) : (
          <div className="flex justify-center items-center">
            <ClipLoader />
            <p className="text-gray-600 text-sm ml-2">Loading...</p>
          </div>
        )}
      </div>
      
      {/* Geolocation button */}
      <button
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              
              const { latitude, longitude } = position.coords;
              
              console.log("User location:", latitude, longitude);
              
            });
          } else {
            toast.error("Geolocation is not supported by your browser.");
          }
        }}
        className="mt-4 inline-block text-amber-600 hover:underline text-sm"
      >
        Use My Location
      </button>
    </div>
  );
};

export default Weather;
