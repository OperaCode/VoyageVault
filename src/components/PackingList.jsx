import { useState } from "react";

const initialItems = ["Passport", "Toothbrush", "Clothes", "Phone Charger"];

const PackingList = () => {
  const [items, setItems] = useState(
    initialItems.map((item) => ({ name: item, packed: false }))
  );

  const togglePacked = (index) => {
    const updated = [...items];
    updated[index].packed = !updated[index].packed;
    setItems(updated);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">🎒 Packing List</h2>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => togglePacked(index)}
            />
            <span className={item.packed ? "line-through text-gray-500" : ""}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackingList;