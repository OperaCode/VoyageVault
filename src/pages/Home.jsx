import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Countdown from "../components/Countdown";
import PackingList from "../components/PackingList";
import Itinerary from "../components/Itenerary";
import Weather from "../components/Weather";
import CurrencyConverter from "../components/CurrencyConverter";
import EmergencyInfo from "../components/EmergencyInfo";
import AiChatBot from "../components/AiChatBot";

const Home = () => {
  const [tripDate, setTripDate] = useState(() => {
    const saved = localStorage.getItem("tripDate");
    return saved ? new Date(saved) : new Date("2025-12-20");
  });
  const [daysLeft, setDaysLeft] = useState(null);
  const [city, setCity] = useState(
    () => localStorage.getItem("city") || "Paris"
  );
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
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [showAI, setShowAI] = useState(false);

  // Countdown
  useEffect(() => {
    const today = new Date();
    const diffTime = tripDate - today;
    setDaysLeft(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    localStorage.setItem("tripDate", tripDate.toISOString());
  }, [tripDate]);

  // Persist packing list in local storage
  useEffect(() => {
    localStorage.setItem("packingList", JSON.stringify(packingList));
  }, [packingList]);

  // Add item to packing list
  // const addPackingItem = () => {
  //   if (newItem.trim()) {
  //     setPackingList((prev) => [
  //       ...prev,
  //       { item: newItem.trim(), packed: false },
  //     ]);
  //     setNewItem("");
  //   }
  // };

  const addPackingItem = (itemObj) => {
    setPackingList((prev) => [...prev, itemObj]);
  };

  // Toggle packed status
  const togglePackedItem = (index) => {
    setPackingList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, packed: !item.packed } : item
      )
    );
  };

  // Remove item from packing list
  const removePackingItem = (index) => {
    setPackingList((prev) => prev.filter((_, i) => i !== index));
  };

  // Weather on load to persist fetch
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

  // Currency converter
  const convertCurrency = async () => {
    try {
      const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
      const res = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      setConverted(res.data.conversion_result.toFixed(2));
      setExchangeRate(res.data.conversion_rate.toFixed(4));
    } catch (err) {
      console.error("Failed to convert currency", err);
      setConverted(null);
      setExchangeRate(null);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConverted(null);
    setExchangeRate(null);
  };

  // Weather icon based on weather condition
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "snow":
        return "❄️";
      default:
        return "🌍";
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-pink-50 text-gray-900 min-h-screen">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 w-full bg-white/95 shadow-md z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
            🌴 WanderKit
          </h1>
          <div className="flex space-x-6 items-center">
            <a
              href="/#welcome"
              className="font-bold hidden sm:block text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Go to welcome section"
            >
              Welcome
            </a>
            
            <Link
              to="/"
              className="font-bold bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
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
          <a
              href="/#welcome"
              className="font-bold hidden sm:block text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Go to welcome section"
            >
              Welcome
            </a>
            {/* <a
             href="/#modals"
              className="font-bold hidden sm:block text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Go to tools section"
            >
              Tools
            </a> */}
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
            WanderKit makes travel planning effortless with intuitive tools.
          </p>
          <div className="mt-6 flex flex-col items-center">
            <button
              onClick={() => setShowAI((prev) => !prev)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition"
            >
              {showAI ? "Close AI Chat 🧠" : "Start with AI 🧠"}
            </button>

            <div
              className={`w-full max-w-3xl mt-4 transition-all duration-500 ${
                showAI
                  ? "opacity-100 max-h-[1000px]"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <div className=" backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-amber-200">
                <AiChatBot />
              </div>
            </div>
          </div>
        </div>

       
      </section>

      {/* Tools Section */}
      <section id="modals" className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-8 border-b border-amber-300">
          {[
            // "Location",
            "countdown",
            "packing",
            "itinerary",
            "weather",
            "currency",
            "emergency",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-lg text-sm font-semibold cursor-pointer ${
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
            <Countdown
              tripDate={tripDate}
              setTripDate={setTripDate}
              daysLeft={daysLeft}
            />
          )}

          {/* Packing List */}
          {activeTab === "packing" && (
            <PackingList
              newItem={newItem}
              setNewItem={setNewItem}
              addPackingItem={addPackingItem}
              togglePackedItem={togglePackedItem}
              removePackingItem={removePackingItem}
              packingList={packingList}
              setPackingList={setPackingList}
            />
          )}

          {/* Itinerary */}
          {activeTab === "itinerary" && <Itinerary />}

          {/* Weather */}
          {activeTab === "weather" && (
            <Weather
              city={city}
              setCity={setCity}
              weather={weather}
              getWeatherIcon={getWeatherIcon}
            />
          )}

          {/* Currency Converter */}
          {activeTab === "currency" && (
            <CurrencyConverter
              amount={amount}
              setAmount={setAmount}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              setFromCurrency={setFromCurrency}
              setToCurrency={setToCurrency}
              convertCurrency={convertCurrency}
              converted={converted}
              exchangeRate={exchangeRate}
              swapCurrencies={swapCurrencies}
            />
          )}

          {/* Emergency Info */}
          {activeTab === "emergency" && (
            // </div>
            <EmergencyInfo />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-100 px-6 py-8 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} WanderKit. Made with 🌎 for travelers.
        </p>
        <nav className="mt-4 space-x-4 flex justify-center ">
          <a
              href="/#welcome"
              className="font-bold hidden sm:block text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Go to welcome section"
            >
              Welcome
            </a>
            
        </nav>
      </footer>
    </div>
  );
};

export default Home;
