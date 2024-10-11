import React from 'react';

const AmountInput = ({ amount, onAmountChange }) => {
  return (
    <div>
      <label>Amount:</label>
      <input 
        type="number" 
        value={amount} 
        onChange={onAmountChange}
        className="p-2 border rounded" 
      />
    </div>
  );
};

export default AmountInput;
