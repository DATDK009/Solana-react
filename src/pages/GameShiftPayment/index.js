import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const GameShiftPayment = ({ onSale }) => {
  const location = useLocation();
  const item = location.state?.item; // Nhận thông tin item từ state

  const [buyerId, setBuyerId] = useState(""); // State để lưu ID người mua
  const [consentUrl, setConsentUrl] = useState(null); // State để lưu consentUrl sau khi mua

  // Kiểm tra xem item có tồn tại không
  if (!item) {
    return <div>Không có thông tin sản phẩm.</div>;
  }

  const handleBuy = async () => {
    const purchaseData = {
      buyerId: buyerId, // Sử dụng ID người mua từ state
    };

    try {
      const response = await fetch(
        `https://api.gameshift.dev/nx/unique-assets/${item.item.id}/buy`,
        {
          method: "POST",
          body: JSON.stringify(purchaseData),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8", // Thay thế bằng API key của bạn
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Đọc thông báo lỗi từ phản hồi
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();

      // Kiểm tra xem onSale có phải là hàm không
      if (typeof onSale === "function") {
        onSale(result); // Gọi hàm onSale với kết quả
      } else {
        console.error("onSale is not a function");
      }

      // Lưu consentUrl vào state
      setConsentUrl(result.consentUrl);
    } catch (error) {
      console.error("Error buying item:", error);
    }
  };

  return (
    <div>
      <h2>Tên: {item.item.name}</h2>
      <h2>
        <img
          src={item.item.imageUrl}
          alt={item.item.name}
          style={{ width: "200px", height: "auto" }}
        />
      </h2>
      <p>Giá: {item.item.priceCents / 100} USD</p>
      <p>Mô tả: {item.item.description}</p>
      <p>Chủ sở hữu: {item.item.owner?.referenceId}</p>
      <input
        className="form-control"
        type="text"
        value={buyerId}
        onChange={(e) => setBuyerId(e.target.value)} // Cập nhật state khi người dùng nhập
        placeholder="Nhập ID người mua"
      />
      <button onClick={handleBuy} className="btn btn-primary container">
        Mua
      </button>

      {/* Hiển thị đường link consentUrl nếu có */}
      {consentUrl && (
        <div>
          <p>Để hoàn tất giao dịch, vui lòng truy cập đường link sau:</p>
          <a href={consentUrl} target="_blank" rel="noopener noreferrer">
            {consentUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default GameShiftPayment;
