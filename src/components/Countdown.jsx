import { useState, useEffect } from "react";

const Countdown = ({tripDate,setTripDate,daysLeft}) => {
  return (
    <div id="countdown-panel" role="tabpanel">
      <h3 className="text-2xl font-semibold text-amber-600 mb-4">
        Trip Countdown
      </h3>
      <input
        type="date"
        className="mb-4 px-4 py-3 rounded-md border-2 border-amber-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm w-full max-w-xs mx-auto"
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
  );
};

export default Countdown;
