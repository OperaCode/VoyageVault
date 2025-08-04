import { useState } from "react";

const categories = ["Clothing", "Toiletries", "Gadgets", "Medications", "Other"];

const PackingList = ({
  newItem,
  setNewItem,
  packingList,
  addPackingItem,
  togglePackedItem,
  removePackingItem,
  setPackingList,
}) => {
  const [newCategory, setNewCategory] = useState("Essentials");

  // Enhanced Add Item
  const handleAddItem = () => {
    if (!newItem.trim()) return;
    addPackingItem({ item: newItem.trim(), packed: false, category: newCategory });
    setNewItem("");
  };

  // Group items by category
  const groupedItems = categories.map((cat) => ({
    category: cat,
    items: packingList
      .filter((item) => item.category === cat)
      .sort((a, b) => a.packed - b.packed),
  }));

  // Bulk actions
  const markAllPacked = () => {
    setPackingList((prev) => prev.map((item) => ({ ...item, packed: true })));
  };

  const clearPacked = () => {
    setPackingList((prev) => prev.filter((item) => !item.packed));
  };

  const isEmpty = packingList.length === 0;
  const packedCount = packingList.filter((i) => i.packed).length;

  return (
    <div >
      <h3 className="text-2xl font-semibold text-amber-600 mb-4">Packing List</h3>

      {/* Input Area */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item"
          className="flex-1 px-4 py-3 rounded-md border-2 border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="px-4 py-3 rounded-md border-2 border-amber-300 text-sm"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddItem}
          className="bg-amber-600 text-white px-4 py-3 rounded-full hover:bg-amber-700 transition-colors text-sm"
        >
          Add
        </button>
      </div>

      {/* Bulk Controls */}
      {!isEmpty && (
        <div className="flex gap-4 text-sm text-gray-600 mb-4 items-center">
          <p>
            Progress: {packedCount}/{packingList.length}
          </p>
          <button onClick={markAllPacked} className="hover:underline text-amber-600">
            Mark all as packed
          </button>
          <button onClick={clearPacked} className="hover:underline text-red-500">
            Clear packed
          </button>
        </div>
      )}

      {/* Progress Bar */}
      {!isEmpty && (
        <div className="w-full bg-amber-100 rounded-full h-2 mb-4">
          <div
            className="bg-amber-600 h-2 rounded-full"
            style={{
              width: `${(packedCount / packingList.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Item List */}
      {isEmpty ? (
        <p className="text-sm text-gray-500 italic font-semibold">
          🧳 Your packing list is empty. Start adding items!
        </p>
      ) : (
        groupedItems.map(
          (group) =>
            group.items.length > 0 && (
              <div key={group.category} className="mb-6">
                <h4 className="text-md font-semibold text-amber-500 mb-2">{group.category}</h4>
                <ul className="list-disc ml-5 text-sm text-gray-600 space-y-2">
                  {group.items.map((entry, i) => (
                    <li key={`${group.category}-${i}`} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={entry.packed}
                          onChange={() =>
                            togglePackedItem(
                              packingList.findIndex(
                                (item) =>
                                  item.item === entry.item && item.category === entry.category
                              )
                            )
                          }
                          className="mr-2"
                        />
                        <span className={entry.packed ? "line-through text-gray-400" : ""}>
                          {entry.item}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          removePackingItem(
                            packingList.findIndex(
                              (item) =>
                                item.item === entry.item && item.category === entry.category
                            )
                          )
                        }
                        className="text-red-500 hover:text-red-600 text-xs"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
        )
      )}
    </div>
  );
};

export default PackingList;
