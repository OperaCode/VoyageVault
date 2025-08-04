import { useState } from "react";


const PackingList = ({newItem,setNewItem, addPackingItem, togglePackedItem,removePackingItem, packingList}) => {
 

  return (
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
  );
};

export default PackingList;