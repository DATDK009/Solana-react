// src/GameShiftPayment.js  
import React, { useState } from 'react';  

const GameShiftPayment = ({ item, onSale }) => {  
  const [price, setPrice] = useState('');  
  const [currency, setCurrency] = useState('USDC'); // Mặc định là USDC  

  const handleSale = async () => {  
    const saleData = {  
      itemId: item.id,  
      price: price,  
      currency: currency,  
    };  

    // Gửi thông tin lên GameShift API  
    try {  
      const response = await fetch('/api/sell-item', {  
        method: 'POST',  
        body: JSON.stringify(saleData),  
        headers: { 'Content-Type': 'application/json' },  
      });  
      
      if (!response.ok) {  
        throw new Error('Network response was not ok');  
      }  

      const result = await response.json();  
      onSale(result);  
    } catch (error) {  
      console.error('Error selling item:', error);  
    }  
  };  

  return (  
    <div>  
      <h2>Item for Sale: {item.name}</h2>  
      <input  
        type="number"  
        value={price}  
        onChange={(e) => setPrice(e.target.value)}  
        placeholder="Nhập giá"  
      />  
      <select   
        value={currency}   
        onChange={(e) => setCurrency(e.target.value)}  
      >  
        <option value="USDC">USDC</option>  
        <option value="ETH">ETH</option>  
        {/* Bạn có thể thêm các đơn vị tiền tệ khác tại đây */}  
      </select>  
      <button onClick={handleSale}>Sell Item</button>  
    </div>  
  );  
};  

export default GameShiftPayment;