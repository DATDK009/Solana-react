import React, { useState } from "react";
import "./styles.css";

const UserItems = ({ authToken }) => {
  const [userId, setUserId] = useState(""); // State để lưu userId từ input
  const [items, setItems] = useState([]); // State để lưu dữ liệu mục của người dùng
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(""); // Trạng thái lỗi
  const [price, setPrice] = useState(""); // State để lưu giá nhập từ người dùng
  const [currency, setCurrency] = useState("USDC"); // Mặc định đơn vị tiền tệ là USDC
  const [consentUrl, setConsentUrl] = useState(""); // lưu link giao dịch

  const handleFetchItems = async () => {
    // Kiểm tra nếu thiếu userId hoặc authToken thì thông báo lỗi
    if (!userId) {
      setError("Vui lòng nhập ID người dùng.");
      return; // Dừng hàm nếu thiếu thông tin
    }

    setLoading(true);
    setError(""); // Reset lỗi khi bắt đầu tải lại dữ liệu

    try {
      // Gửi yêu cầu API để lấy các mục của người dùng
      const response = await fetch(
        `https://api.gameshift.dev/nx/users/${userId}/items`,
        {
          headers: {
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8",
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu các mục của người dùng.");
      }

      const data = await response.json();
      setItems(data.data || []); // Lưu danh sách mục
    } catch (error) {
      setError(error.message); // Hiển thị thông báo lỗi nếu có
    } finally {
      setLoading(false); // Đặt lại trạng thái loading
    }
  };

  const handleListForSale = async (assetId) => {
    if (!price || isNaN(price) || price <= 0) {
      setError("Vui lòng nhập giá hợp lệ.");
      return;
    }

    setLoading(true);
    setError(""); // Reset lỗi khi bắt đầu gửi yêu cầu

    try {
      // Đảm bảo sử dụng USDC làm đơn vị tiền tệ
      const response = await fetch(
        `https://api.gameshift.dev/nx/unique-assets/${assetId}/list-for-sale`,
        {
          method: "POST",
          headers: {
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8", // Thay bằng API key của bạn
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            price: {
              currencyId: currency, // Đảm bảo sử dụng "USDC" làm đơn vị tiền tệ
              naturalAmount: price,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Không thể đăng sản phẩm lên bán.";
        setError(`Lỗi: ${errorMessage}`);
        return;
      }

      // Sau khi đăng bán thành công, yêu cầu lại dữ liệu sản phẩm để cập nhật giá
      const updatedItems = await fetch(
        `https://api.gameshift.dev/nx/users/${userId}/items`,
        {
          headers: {
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8",
            accept: "application/json",
          },
        }
      );

      const responseData = await response.json();
      setConsentUrl(responseData.consentUrl); // Lưu consentUrl
      const updatedData = await updatedItems.json();
      setItems(updatedData.data || []); // Cập nhật danh sách mục
      alert("Sản phẩm đã được đăng bán thành công!");
    } catch (error) {
      setError(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-items-container">
      <h2>Các mục của bạn</h2>

      {/* Input cho userId */}
      <div className="input-container">
        <label htmlFor="userId">Nhập ID người dùng: </label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Nhập ID người dùng"
        />
      </div>

      {/* Nút gọi hàm lấy dữ liệu */}
      <button
        onClick={handleFetchItems}
        disabled={loading}
        className="fetch-button"
      >
        {loading ? "Đang tải..." : "Tải các mục của bạn"}
      </button>

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="error-message">{error}</p>}

      {/* Hiển thị danh sách mục của người dùng */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index} className="item">
              <h3>
                {item.type === "Currency" ? item.item.name : item.item.name}
              </h3>
              {item.type === "Currency" ? (
                <div>
                  <p>
                    <strong>Loại:</strong> {item.item.symbol}
                  </p>
                  <p>
                    <strong>Số lượng:</strong> {item.quantity}
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Mô tả:</strong> {item.item.description}
                  </p>
                  <p>
                    <strong>Thuộc tính:</strong>{" "}
                    {item.item.attributes[0]?.traitType}:{" "}
                    {item.item.attributes[0]?.value}
                  </p>
                  <img
                    src={item.item.imageUrl}
                    alt={item.item.name}
                    width={"200px"}
                    height={"200px"}
                  />
                  {/* Form nhập giá cho sản phẩm */}
                  <div className="price-input-container">
                    <label htmlFor="price">Nhập giá: </label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Giá sản phẩm"
                    />
                    <label htmlFor="currency">Đơn vị tiền tệ: </label>
                    <select
                      id="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="USDC">USDC</option>
                      {/* Bạn có thể thêm các đơn vị tiền tệ khác ở đây */}
                    </select>
                    <button
                      onClick={() => handleListForSale(item.item.id)}
                      disabled={loading}
                    >
                      {loading ? "Đang đăng bán..." : "Đăng bán"}
                    </button>
                    <p>
                      <strong>Giao dịch:</strong>{" "}
                      <a
                        href={consentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {consentUrl}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Bạn không có mục nào.</p>
      )}
    </div>
  );
};

export default UserItems;
