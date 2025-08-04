import React from "react";

const CurrencyConverter = ({
  amount,
  setAmount,
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
  convertCurrency,
  converted,
  exchangeRate,
  swapCurrencies,
}) => {
  return (
    <div id="currency-panel" role="tabpanel">
      <h3 className="text-2xl font-semibold text-amber-600 mb-4">
        Currency Converter
      </h3>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full px-4 py-3 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Enter amount"
        />

        <div className="flex gap-2">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="px-4 py-3 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="From currency"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="NGN">NGN</option>
            <option value="JPY">JPY</option>
          </select>

          <button
            onClick={swapCurrencies}
            className="px-3 text-lg text-amber-600 hover:text-amber-800"
            aria-label="Swap currencies"
          >
            ⇄
          </button>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="px-4 py-3 rounded-full border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="To currency"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="NGN">NGN</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
      </div>

      <button
        onClick={convertCurrency}
        className="bg-amber-600 text-white px-4 py-3 rounded-full hover:bg-amber-700 transition-colors text-sm mb-3"
        disabled={!amount || amount <= 0}
      >
        Convert
      </button>

      {exchangeRate && (
        <p className="text-sm text-gray-500 mb-1">
          1 {fromCurrency} = {exchangeRate} {toCurrency}
        </p>
      )}

      {converted !== null && (
        <p className="text-base font-medium text-amber-700">
          {amount} {fromCurrency} = {converted} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
