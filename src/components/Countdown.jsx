import { useState, useEffect } from "react";

const Countdown = () => {
  const [tripDate, setTripDate] = useState("2025-12-31");
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const updateCountdown = () => {
      const today = new Date();
      const target = new Date(tripDate);
      const diffTime = target - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    };
    updateCountdown();
  }, [tripDate]);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">📅 Trip Countdown</h2>
      <input
        type="date"
        value={tripDate}
        onChange={(e) => setTripDate(e.target.value)}
        className="border rounded p-2 mb-2 w-full"
      />
      <p className="text-lg">{daysLeft !== null ? `${daysLeft} days to go!` : "Set your trip date"}</p>
    </div>
  );
};

export default Countdown;