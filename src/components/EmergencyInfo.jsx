import React, { useState } from "react";

const storageKey = "emergencyContacts";

const EmergencyInfo = () => {
  const [contacts, setContacts] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const updateContact = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const addContact = () => {
    const newContact = { label: "", number: "", description: "" };
    const updated = [...contacts, newContact];
    setContacts(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const removeContact = (index) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return (
    <div id="emergency-panel" role="tabpanel">
      <h3 className="text-2xl font-semibold text-amber-600 mb-4 flex items-center justify-between">
        Emergency Info
        <button
          onClick={addContact}
          className="text-sm text-white bg-amber-500 px-2 py-1 rounded hover:bg-amber-600"
        >
          + Add
        </button>
      </h3>
      <ul className="space-y-3 text-sm text-gray-700">
        {contacts.map((contact, index) => (
          <li key={index} className="border-l-4 border-amber-500 pl-3 relative">
            <div className="flex items-center gap-2">
              <input
                value={contact.label}
                onChange={(e) => updateContact(index, "label", e.target.value)}
                placeholder="Label"
                className="font-semibold bg-transparent border-b border-dotted border-gray-300 focus:outline-none"
              />
              :
              <input
                value={contact.number}
                onChange={(e) => updateContact(index, "number", e.target.value)}
                placeholder="Phone number"
                className="text-blue-600 underline bg-transparent border-b border-dotted border-gray-300 focus:outline-none"
              />
            </div>
            <input
              value={contact.description}
              onChange={(e) => updateContact(index, "description", e.target.value)}
              placeholder="Description"
              className="text-gray-500 text-xs mt-1 bg-transparent border-b border-dotted border-gray-300 focus:outline-none w-full"
            />
            <button
              onClick={() => removeContact(index)}
              className="absolute top-0 right-0 text-xs text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
        {contacts.length === 0 && (
          <p className="text-gray-400 text-sm">No emergency contacts added.</p>
        )}
      </ul>
    </div>
  );
};

export default EmergencyInfo;
