// src/GameShiftPayment.js
import React, { useState } from 'react';

const GameShiftPayment = ({ item, onSale }) => {
  const handleSale = async () => {
    const saleData = {
      itemId: item.id,
      price: item.price,
      currency: 'USDC',
    };
    // Gửi thông tin lên GameShift API
    const response = await fetch('/api/sell-item', {
      method: 'POST',
      body: JSON.stringify(saleData),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    onSale(result);
  };

  return (
    <div>
      <h2>Item for Sale: {item.name}</h2>
      <button onClick={handleSale}>Sell Item</button>
    </div>
  );
};

export default GameShiftPayment;
