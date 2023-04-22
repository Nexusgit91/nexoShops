import React, { useState } from "react";

const PaymentOption = ({ option, onSelect }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
    onSelect(option.id);
  };

  return (
    <div className="payment-option">
      <input
        type="radio"
        id={option.id}
        name="paymentOption"
        checked={selected}
        onChange={handleSelect}
      />
      <label htmlFor={option.id}>{option.name}</label>
    </div>
  );
};

export default PaymentOption;
