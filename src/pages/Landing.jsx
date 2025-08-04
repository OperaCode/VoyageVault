import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
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
              href="/#home"
              className="text-gray-700 hover:text-amber-600 transition-colors font-bold"
            >
              Home
            </a>
            <a
              href="/#features"
              className="text-gray-700 hover:text-amber-600 transition-colors font-bold"
            >
              Features
            </a>
            <a
              href="/#about"
              className="text-gray-700 hover:text-amber-600 transition-colors font-bold"
            >
              About
            </a>
            <Link
              to="/dashboard"
              className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors font-bold"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center relative before:content-[''] before:absolute before:inset-0 before:bg-amber-50/70"
      >
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
            Explore the World!
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-800">
            WanderKit: Your all-in-one app for seamless travel planning and
            unforgettable adventures.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <a
              href="/#features"
              className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors font-bold"
            >
              Discover Features
            </a>
            <Link
              to="/dashboard"
              className="bg-white text-amber-600 px-8 py-3 rounded-full border-2 border-amber-600 hover:bg-amber-50 transition-colors font-bold"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
          🌍 Travel Made Simple
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-amber-600">
              🧳 Packing List
            </h3>
            <p className="text-gray-600">
              Create custom packing lists for every trip.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-amber-600">
              ⏰ Countdown
            </h3>
            <p className="text-gray-600">
              Track the days until your adventure begins.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-amber-600">
              ☀️ Weather
            </h3>
            <p className="text-gray-600">
              Get live weather updates for your destination.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-amber-600">
              💸 Currency
            </h3>
            <p className="text-gray-600">
              Convert currencies instantly on the go.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-amber-600">
              🗺️ Itinerary
            </h3>
            <p className="text-gray-600">
              Plan your trip with detailed schedules.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-amber-600">
              🆘 Emergency
            </h3>
            <p className="text-gray-600">
              Access global emergency contacts quickly.
            </p>
          </div>
        </div>
      </section>

      <section id="about">

        {/* About Section */}
        <section  className="px-6 py-20 bg-pink-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
              About WanderKit
            </h2>
            <p className="text-lg text-gray-700">
              WanderKit is built for travelers who want stress-free
              adventures. Plan, pack, and explore with ease using our intuitive
              tools designed to make every journey unforgettable.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 py-20 bg-gradient-to-r from-amber-600 to-pink-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Next Trip?</h2>
          <p className="mb-8 text-lg">
            Join WanderKit and start planning your adventure today!
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-amber-600 px-8 py-3 rounded-full hover:bg-amber-50 transition-colors font-bold"
          >
            Launch Dashboard
          </Link>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-amber-100 px-6 py-8 text-center text-sm text-gray-600 font-bold">
        <p>
          © {new Date().getFullYear()} WanderKit. Made for travelers 🌎.
        </p>
        <nav className="mt-4 space-x-4">
          <a
            href="/#features"
            className="hover:underline font-bold"
          >
            Features
          </a>
          <a
            href="/about"
            className="hover:underline font-bold"
          >
            About
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Landing;
