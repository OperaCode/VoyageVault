import { useState } from "react";

const Itinerary = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    time: "",
    location: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (!form.title || !form.time) return;
    setItems([...items, { ...form, id: Date.now() }]);
    setForm({ title: "", time: "", location: "", notes: "" });
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const groupedByDate = items.reduce((acc, item) => {
    const date = item.time.split("T")[0];
    acc[date] = acc[date] || [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div id="itinerary-panel" role="tabpanel">
      <h3 className="text-2xl font-semibold text-amber-600 mb-4">Itinerary</h3>

      <section className="md:flex items-center">
        {/* itiniery creation Form */}
        <div className=" flex-1 mb-4 flex flex-col gap-2">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Activity title"
            className="px-4 py-3 rounded-md border-2 border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="datetime-local"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="px-4 py-3 rounded-md border-2 border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location (optional)"
            className="px-4 py-3 rounded-md border-2 border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes (optional)"
            className="px-4 py-3 rounded-md border-2 border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={addItem}
            className="w-3/4 m-auto bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
          >
            Add to Itinerary
          </button>
        </div>

          {/* Itinerary enteries Display */}
        <div className="flex-1 space-y-6">
          {Object.entries(groupedByDate).map(([date, events]) => (
            <div key={date} className="border rounded-lg p-4 shadow-sm">
              <h4 className="text-lg font-bold text-amber-500 mb-2">
                📅 {date}
              </h4>
              <ul className="space-y-2">
                {events.map((item) => (
                  <li
                    key={item.id}
                    className="p-3 bg-white border rounded-md flex justify-between items-start"
                  >
                    <div>
                      <p className="font-semibold">
                        ⏰{" "}
                        {new Date(item.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        - {item.title}
                      </p>
                      {item.location && (
                        <p className="text-sm text-gray-600">
                          📍 {item.location}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-sm text-gray-500 italic">
                          📝 {item.notes}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-sm text-gray-600 text-center">No itinerary added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Itinerary;
