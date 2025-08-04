import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [tripDate, setTripDate] = useState(() => {
    const saved = localStorage.getItem("tripDate");
    return saved ? new Date(saved) : new Date("2025-12-20");
  });
  const [daysLeft, setDaysLeft] = useState(null);
  const [city, setCity] = useState(() => localStorage.getItem("city") || "Paris");
  const [packingList, setPackingList] = useState(() => {
    const saved = localStorage.getItem("packingList");
    return saved ? JSON.parse(saved) : [];
  });
  const [newItem, setNewItem] = useState("");
  const [weather, setWeather] = useState(null);
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(null);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Countdown
  useEffect(() => {
    const today = new Date();
    const diffTime = tripDate - today;
    setDaysLeft(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    localStorage.setItem("tripDate", tripDate.toISOString());
  }, [tripDate]);

  // Persist packing list
  useEffect(() => {
    localStorage.setItem("packingList", JSON.stringify(packingList));
  }, [packingList]);

  // Add item to packing list
  const addPackingItem = () => {
    if (newItem.trim()) {
      setPackingList((prev) => [...prev, newItem.trim()]);
      setNewItem("");
    }
  };

  // Weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        setWeather({
          temp: `${Math.round(res.data.main.temp)}°C`,
          condition: res.data.weather[0].main,
        });
      } catch (err) {
        console.error("Failed to fetch weather", err);
        setWeather(null);
      }
    };
    if (city) fetchWeather();
  }, [city]);

  // Currency
  const convertCurrency = async () => {
    try {
      const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
      const res = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/EUR/${amount}`
      );
      setConverted(res.data.conversion_result.toFixed(2));
    } catch (err) {
      console.error("Failed to convert currency", err);
      setConverted(null);
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-pink-50 text-gray-900 min-h-screen">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 w-full bg-white/95 shadow-md z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
            🌴 VoyageVault
          </h1>
          <div className="flex space-x-6">
            <button
              onClick={() => scrollToSection("countdown")}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Countdown
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Tools
            </button>
            <Link
              to="/"
              className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
            >
              Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-20 space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
            Your Travel Dashboard
          </h2>
          <p className="text-lg text-gray-700 mt-2">
            Plan, track, and conquer your next adventure with ease
          </p>
        </div>

        {/* Trip Countdown */}
        <section id="countdown" className="bg-amber-100 rounded-2xl shadow-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-amber-600 mb-4">Trip Countdown</h3>
          <input
            type="date"
            className="mb-4 px-4 py-2 rounded-full border border-amber-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            value={tripDate.toISOString().split("T")[0]}
            onChange={(e) => setTripDate(new Date(e.target.value))}
          />
          {daysLeft !== null ? (
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
              {daysLeft} days to go!
            </p>
          ) : (
            <p className="text-gray-600">Loading...</p>
          )}
        </section>

        {/* Tools Section */}
        <section id="tools" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Itinerary */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-amber-600 mb-3">Itinerary</h4>
            <p className="text-sm text-gray-600">Feature coming soon...</p>
          </div>

          {/* Packing List */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-amber-600 mb-3">Packing List</h4>
            <ul className="list-disc ml-5 mb-4 text-sm text-gray-600">
              {packingList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add item"
                className="flex-1 px-3 py-2 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={addPackingItem}
                className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors text-sm"
              >
                Add
              </button>
            </div>
          </div>

          {/* Weather */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-amber-600 mb-3">Weather</h4>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                localStorage.setItem("city", e.target.value);
              }}
              className="w-full mb-3 px-3 py-2 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter city"
            />
            {weather ? (
              <div className="text-center">
                <p className="text-sm text-gray-600">📍 {city}</p>
                <p className="text-2xl font-semibold text-amber-600">{weather.temp}</p>
                <p className="text-sm text-gray-600">{weather.condition}</p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Loading...</p>
            )}
          </div>

          {/* Currency Converter */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-amber-600 mb-3">Currency Converter</h4>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="USD"
                className="w-full px-3 py-2 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={convertCurrency}
                className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors text-sm"
              >
                Convert
              </button>
            </div>
            {converted && (
              <p className="mt-3 text-sm text-gray-600">EUR: €{converted}</p>
            )}
          </div>

          {/* Emergency Info */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-amber-600 mb-3">Emergency Info</h4>
            <ul className="text-sm text-gray-600">
              <li><strong>Emergency:</strong> 112</li>
              <li><strong>Hotel:</strong> +33 1 23 45 67 89</li>
              <li><strong>Embassy:</strong> +33 1 43 12 34 56</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-amber-100 px-6 py-8 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} VoyageVault. Made with 🌎 for travelers.</p>
        <nav className="mt-4 space-x-4">
          <button onClick={() => scrollToSection("countdown")} className="hover:underline">
            Countdown
          </button>
          <button onClick={() => scrollToSection("tools")} className="hover:underline">
            Tools
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default Home;