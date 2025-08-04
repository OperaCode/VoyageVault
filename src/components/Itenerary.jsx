import { useState } from "react";

const Itinerary = () => {
  const [days, setDays] = useState([]);
  const [activity, setActivity] = useState("");
  const [day, setDay] = useState("");

  const addActivity = () => {
    if (!day || !activity) return;
    const updatedDays = [...days];
    const existingDay = updatedDays.find((d) => d.day === day);
    if (existingDay) {
      existingDay.activities.push(activity);
    } else {
      updatedDays.push({ day, activities: [activity] });
    }
    setDays(updatedDays);
    setActivity("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">🗓️ Trip Itinerary</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Day 1 / Monday"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Add activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button onClick={addActivity} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <div className="space-y-2">
        {days.map((d, idx) => (
          <div key={idx} className="border-b pb-2">
            <h3 className="font-bold">📌 {d.day}</h3>
            <ul className="list-disc ml-6">
              {d.activities.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;