import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const currencies = [
    { code: "USD", flag: "US" },
    { code: "EUR", flag: "EU" },
    { code: "EGP", flag: "EG" }, 
    { code: "GBP", flag: "GB" },
    { code: "AUD", flag: "AU" },
    { code: "CAD", flag: "CA" },
    { code: "CHF", flag: "CH" },
    { code: "CNY", flag: "CN" },
    { code: "JPY", flag: "JP" },
    { code: "NZD", flag: "NZ" },
    { code: "SEK", flag: "SE" },
    { code: "NOK", flag: "NO" },
    { code: "MXN", flag: "MX" },
    { code: "SGD", flag: "SG" },
    { code: "HKD", flag: "HK" },
    { code: "ILS", flag: "IL" },
    { code: "THB", flag: "TH" },
    { code: "INR", flag: "IN" },
    { code: "ZAR", flag: "ZA" },
    { code: "BRL", flag: "BR" },
    { code: "PLN", flag: "PL" },
    { code: "DKK", flag: "DK" },
    { code: "AED", flag: "AE" },
    { code: "HUF", flag: "HU" },
    { code: "MYR", flag: "MY" },
    { code: "PHP", flag: "PH" },
    { code: "ISK", flag: "IS" },
    { code: "CZK", flag: "CZ" },
    { code: "RON", flag: "RO" },
    { code: "TRY", flag: "TR" },
    { code: "RUB", flag: "RU" },
    { code: "ARS", flag: "AR" },
    { code: "CLP", flag: "CL" },
    { code: "COP", flag: "CO" },
    { code: "TWD", flag: "TW" },
    { code: "SAR", flag: "SA" },
    { code: "PKR", flag: "PK" },
    { code: "BDT", flag: "BD" },
    { code: "NGN", flag: "NG" },
    { code: "MAD", flag: "MA" },
    { code: "KWD", flag: "KW" },
    { code: "OMR", flag: "OM" },
    { code: "QAR", flag: "QA" },
    { code: "BHD", flag: "BH" },
    { code: "JOD", flag: "JO" },
    { code: "XOF", flag: "CI" },
    { code: "GHS", flag: "GH" },
    { code: "LKR", flag: "LK" },
    { code: "VND", flag: "VN" },
    { code: "RSD", flag: "RS" },
    { code: "DOP", flag: "DO" },
    { code: "UYU", flag: "UY" },
    { code: "MOP", flag: "MO" },
  ];

  const fetchExchangeRate = async () => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (data.rates[toCurrency] === undefined) {
        throw new Error(`Exchange rate not found for currency: ${toCurrency}`);
      }

      setExchangeRate(data.rates[toCurrency]);

      const conversion = Number(amount) * data.rates[toCurrency]; 
      setConvertedAmount(conversion.toFixed(2));
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      setConvertedAmount(null);
    }
  };

  const handleConvert = () => {
    fetchExchangeRate();
  };

  return (
    
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500`}>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl mb-4 text-center">Currency Converter</h1>

          <div className="mb-4">
            <label className="block text-sm mb-2">From:</label>
            <ReactFlagsSelect
              selected={fromCurrency}
              onSelect={(code) => {
                const currency = currencies.find(c => c.flag === code);
                if (currency) {
                  setFromCurrency(currency.code);
                  setConvertedAmount(null);
                }
              }}
              countries={currencies.map(currency => currency.flag)}
              className="w-full"
            />
            <div className="text-center mt-2">
              {fromCurrency}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">To:</label>
            <ReactFlagsSelect
              selected={toCurrency}
              onSelect={(code) => {
                const currency = currencies.find(c => c.flag === code);
                if (currency) {
                  setToCurrency(currency.code);
                  setConvertedAmount(null);
                }
              }}
              countries={currencies.map(currency => currency.flag)}
              className="w-full"
            />
            
            <div className="text-center mt-2">
              {toCurrency} 
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
            />
          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleConvert} 
              className="bg-teal-500 dark:bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-400 dark:hover:bg-teal-500 transition-colors"
            >
              Convert
            </button>
          </div>

          {convertedAmount && (
            <div className="mt-4 text-center">
              <p className="text-lg">
                Converted Amount: {convertedAmount} {toCurrency}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;