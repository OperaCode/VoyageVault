import React from "react";

const CurrencyConverter = ({amount,setAmount, convertCurrency, converted}) => {
  return (
    <div id="currency-panel" role="tabpanel">
      <h3 className="text-2xl font-semibold text-amber-600 mb-4">
        Currency Converter
      </h3>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in USD"
          className="w-full px-4 py-3 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Enter amount in USD"
        />
        <button
          onClick={convertCurrency}
          className="bg-amber-600 text-white px-4 py-3 rounded-full hover:bg-amber-700 transition-colors text-sm"
          disabled={!amount || amount <= 0}
          aria-label="Convert currency"
        >
          Convert
        </button>
      </div>
      {converted && <p className="text-sm text-gray-600">EUR: €{converted}</p>}
    </div>
  );
};

export default CurrencyConverter;
