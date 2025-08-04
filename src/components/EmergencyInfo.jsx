import React, { useState, useEffect } from "react";

const defaultContacts = [
  { label: "Emergency", number: "112", description: "Europe-wide emergency number" },
  { label: "Hotel", number: "+33 1 23 45 67 89", description: "Front desk (24/7)" },
  { label: "Embassy", number: "+33 1 43 12 34 56", description: "Nigerian Embassy in Paris" },
];

const EmergencyInfo = () => {
  const [contacts, setContacts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("emergencyContacts");
    setContacts(saved ? JSON.parse(saved) : defaultContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = (index, key, value) => {
    const updated = [...contacts];
    updated[index][key] = value;
    setContacts(updated);
  };

  const handleSave = () => setEditingIndex(null);

  return (
    <div id="emergency-panel" role="tabpanel">
      <h3 className="text-2xl font-semibold text-amber-600 mb-4">Emergency Info</h3>
      <ul className="space-y-4 text-sm text-gray-700">
        {contacts.map((contact, index) => (
          <li key={index} className="border-l-4 border-amber-500 pl-4">
            {editingIndex === index ? (
              <div className="space-y-1">
                <input
                  type="text"
                  value={contact.label}
                  onChange={(e) => handleChange(index, "label", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  placeholder="Label"
                />
                <input
                  type="text"
                  value={contact.number}
                  onChange={(e) => handleChange(index, "number", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  value={contact.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  placeholder="Description"
                />
                <button
                  onClick={handleSave}
                  className="mt-2 px-3 py-1 bg-amber-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <p>
                  <strong>{contact.label}:</strong>{" "}
                  <a href={`tel:${contact.number}`} className="text-blue-600 underline">
                    {contact.number}
                  </a>
                </p>
                <p className="text-gray-500 text-xs">{contact.description}</p>
                <button
                  onClick={() => setEditingIndex(index)}
                  className="text-xs text-amber-600 mt-1 underline"
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyInfo;
