import React from "react";

const Weather = ({city,setCity,weather,getWeatherIcon}) => {
  return (
    <div id="weather-panel" role="tabpanel">
      <h3 className="text-2xl font-semibold text-amber-600 mb-4">Weather</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            localStorage.setItem("city", e.target.value);
          }}
          className="w-full px-4 py-3 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Enter city"
          aria-label="Enter city for weather"
        />
        <button
          onClick={() => setCity(city)} 
          className="bg-amber-600 text-white px-4 py-3 rounded-full hover:bg-amber-700 transition-colors text-sm"
          aria-label="Refresh weather"
        >
          Refresh
        </button>
      </div>
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
          </div>
        )
      ) : (
        <p className="text-gray-600 text-sm">Loading...</p>
      )}
    </div>
  );
};

export default Weather;
