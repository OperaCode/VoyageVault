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
  const [activeTab, setActiveTab] = useState("countdown");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      setPackingList((prev) => [...prev, { item: newItem.trim(), packed: false }]);
      setNewItem("");
    }
  };

  // Toggle packed status
  const togglePackedItem = (index) => {
    setPackingList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, packed: !item.packed } : item))
    );
  };

  // Remove item from packing list
  const removePackingItem = (index) => {
    setPackingList((prev) => prev.filter((_, i) => i !== index));
  };

  // Weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeather(null); // Reset for loading state
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
        setWeather({ error: "City not found, please try again" });
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

  // Weather icon based on condition
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case "clear": return "☀️";
      case "clouds": return "☁️";
      case "rain": return "🌧️";
      case "snow": return "❄️";
      default: return "🌍";
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
          <div className="flex space-x-6 items-center">
            <button
              onClick={() => scrollToSection("welcome")}
              className="hidden sm:block text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Go to welcome section"
            >
              Welcome
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="hidden sm:block text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Go to tools section"
            >
              Tools
            </button>
            <Link
              to="/"
              className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
              aria-label="Go to landing page"
            >
              Landing
            </Link>
            <button
              className="sm:hidden text-gray-700 hover:text-amber-600"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle mobile menu"
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-16 right-0 w-64 bg-white/95 shadow-lg h-full z-40 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <button
            onClick={() => {
              scrollToSection("welcome");
              setIsSidebarOpen(false);
            }}
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Welcome
          </button>
          <button
            onClick={() => {
              scrollToSection("tools");
              setIsSidebarOpen(false);
            }}
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Tools
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <section
        id="welcome"
        className="pt-20 pb-12 px-6 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center relative before:content-[''] before:absolute before:inset-0 before:bg-amber-50/70"
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
            Welcome to Your Next Adventure!
          </h2>
          <p className="text-lg text-gray-700 mt-2 max-w-2xl mx-auto">
            VoyageVault makes travel planning effortless with intuitive tools.
          </p>
          <button
            onClick={() => scrollToSection("tools")}
            className="mt-6 bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors"
            aria-label="Quick start with tools"
          >
            Quick Start
          </button>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-8 border-b border-amber-300">
          {["countdown", "packing", "itinerary", "weather", "currency", "emergency"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-lg text-sm font-semibold ${
                activeTab === tab
                  ? "bg-amber-600 text-white"
                  : "bg-white text-amber-600 hover:bg-amber-50"
              } transition-colors`}
              aria-selected={activeTab === tab}
              aria-controls={`${tab}-panel`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Countdown */}
          {activeTab === "countdown" && (
            <div id="countdown-panel" role="tabpanel">
              <h3 className="text-2xl font-semibold text-amber-600 mb-4">Trip Countdown</h3>
              <input
                type="date"
                className="mb-4 px-4 py-3 rounded-full border border-amber-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm w-full max-w-xs mx-auto"
                value={tripDate.toISOString().split("T")[0]}
                onChange={(e) => setTripDate(new Date(e.target.value))}
                aria-label="Select trip date"
              />
              {daysLeft !== null ? (
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
                  {daysLeft} days to go!
                </p>
              ) : (
                <p className="text-gray-600">Loading...</p>
              )}
            </div>
          )}

          {/* Packing List */}
          {activeTab === "packing" && (
            <div id="packing-panel" role="tabpanel">
              <h3 className="text-2xl font-semibold text-amber-600 mb-4">Packing List</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add item"
                  className="flex-1 px-4 py-3 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Add new packing item"
                />
                <button
                  onClick={addPackingItem}
                  className="bg-amber-600 text-white px-4 py-3 rounded-full hover:bg-amber-700 transition-colors text-sm"
                  aria-label="Add item to packing list"
                >
                  Add
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Progress: {packingList.filter((item) => item.packed).length}/{packingList.length}
                </p>
                <div className="w-full bg-amber-100 rounded-full h-2 mt-2">
                  <div
                    className="bg-amber-600 h-2 rounded-full"
                    style={{
                      width: `${(packingList.filter((item) => item.packed).length / packingList.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <ul className="list-disc ml-5 text-sm text-gray-600">
                {packingList.map((entry, i) => (
                  <li key={i} className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={entry.packed}
                        onChange={() => togglePackedItem(i)}
                        className="mr-2"
                        aria-label={`Mark ${entry.item} as packed`}
                      />
                      <span className={entry.packed ? "line-through text-gray-400" : ""}>
                        {entry.item}
                      </span>
                    </div>
                    <button
                      onClick={() => removePackingItem(i)}
                      className="text-red-500 hover:text-red-600 text-xs"
                      aria-label={`Remove ${entry.item} from packing list`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Itinerary */}
          {activeTab === "itinerary" && (
            <div id="itinerary-panel" role="tabpanel">
              <h3 className="text-2xl font-semibold text-amber-600 mb-4">Itinerary</h3>
              <p className="text-sm text-gray-600">Feature coming soon...</p>
            </div>
          )}

          {/* Weather */}
          {activeTab === "weather" && (
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
                  onClick={() => setCity(city)} // Trigger refetch
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
          )}

          {/* Currency Converter */}
          {activeTab === "currency" && (
            <div id="currency-panel" role="tabpanel">
              <h3 className="text-2xl font-semibold text-amber-600 mb-4">Currency Converter</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount in USD"
                  className="w-full px-4 py-3 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Enter amount in USD"
                />
                <button
                  onClick={convertCurrency}
                  className="bg-amber-600 text-white px-4 py-3 rounded-full hover:bg-amber-700 transition-colors text-sm"
                  disabled={!amount || amount <= 0}
                  aria-label="Convert currency"
                >
                  Convert
                </button>
              </div>
              {converted && (
                <p className="text-sm text-gray-600">EUR: €{converted}</p>
              )}
            </div>
          )}

          {/* Emergency Info */}
          {activeTab === "emergency" && (
            <div id="emergency-panel" role="tabpanel">
              <h3 className="text-2xl font-semibold text-amber-600 mb-4">Emergency Info</h3>
              <ul className="text-sm text-gray-600">
                <li><strong>Emergency:</strong> 112</li>
                <li><strong>Hotel:</strong> +33 1 23 45 67 89</li>
                <li><strong>Embassy:</strong> +33 1 43 12 34 56</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-100 px-6 py-8 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} VoyageVault. Made with 🌎 for travelers.</p>
        <nav className="mt-4 space-x-4">
          <button
            onClick={() => scrollToSection("welcome")}
            className="hover:underline"
            aria-label="Go to welcome section"
          >
            Welcome
          </button>
          <button
            onClick={() => scrollToSection("tools")}
            className="hover:underline"
            aria-label="Go to tools section"
          >
            Tools
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default Home;