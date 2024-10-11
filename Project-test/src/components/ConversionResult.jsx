import React from 'react';

const ConversionResult = ({ result }) => {
  return (
    <div>
      {result && <p>Converted Amount: {result}</p>}
    </div>
  );
};

export default ConversionResult;
