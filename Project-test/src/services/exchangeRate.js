import axios from 'axios';

const API_KEY = '02c3f80b2b8313f840241f0e'; 
const API_URL = `https://v6.exchangerate-api.com/v6/02c3f80b2b8313f840241f0e/latest/USD`;

export const fetchExchangeRate = async (fromCurrency, toCurrency, amount) => {
  const fromCurrencyCode = currencyMap[fromCurrency];
  const toCurrencyCode = currencyMap[toCurrency];

  if (!fromCurrencyCode || !toCurrencyCode) {
    console.error('Invalid currency selection');
    return;
  }

  const url = `${API_URL}${fromCurrencyCode}`; 
  console.log(`Fetching exchange rate for: ${fromCurrencyCode} to ${toCurrencyCode}`);

  try {
    const response = await axios.get(url);
    if (!response.data.conversion_rates || !response.data.conversion_rates[toCurrencyCode]) {
      throw new Error('Currency not found.');
    }
    
    const rate = response.data.conversion_rates[toCurrencyCode];
    console.log('Exchange rate:', rate);
    
    return amount * rate; 
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Failed to fetch exchange rate.');
  }
};


