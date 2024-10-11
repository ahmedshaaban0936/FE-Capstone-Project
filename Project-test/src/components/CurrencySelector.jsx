import React from 'react';

const CurrencySelector = ({ label, currency, onChange, options }) => {
  return (
    <div>
      <label>{label}</label>
      <select value={currency} onChange={onChange} className="p-2 border rounded">
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
