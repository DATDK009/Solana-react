import React, { useState } from "react";
import "./styles.css";

const UserItems = ({ authToken }) => {
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USDC"); // Mặc định là "USDC"
  // const [consentUrl, setConsentUrl] = useState("");

  const handleFetchItems = async () => {
    if (!userId) {
      setError("Vui lòng nhập ID người dùng.");
      return;
    }

    setLoading(true);
    setError("");

    try {
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
      setItems(data.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleListForSale = async (assetId) => {
    // Kiểm tra nếu giá chưa được nhập hoặc không hợp lệ
    if (!price[assetId] || isNaN(price[assetId]) || price[assetId] <= 0) {
      setError("Vui lòng nhập giá hợp lệ.");
      return;
    }

    setLoading(true); // Hiển thị trạng thái đang tải
    setError(""); // Reset lỗi

    try {
      // Gửi yêu cầu POST để đăng bán tài sản
      const response = await fetch(
        `https://api.gameshift.dev/nx/unique-assets/${assetId}/list-for-sale`,
        {
          method: "POST", // Phương thức POST
          headers: {
            accept: "application/json", // Định dạng trả về là JSON
            "content-type": "application/json", // Nội dung là JSON
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8",
          },
          body: JSON.stringify({
            price: {
              currencyId: "USDC", // Loại tiền tệ
              naturalAmount: parseFloat(price[assetId]).toFixed(2).toString(), // Số tiền
            },
          }),
        }
      );

      // Kiểm tra nếu phản hồi không OK
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Không thể đăng sản phẩm lên bán.";
        setError(`Lỗi: ${errorMessage}`);
        return;
      }

      const data = await response.json();
      const { consentUrl } = data;

      // Điều hướng người dùng đến URL đồng ý
      window.location.href = consentUrl;

      // Thông báo thành công
      alert("Sản phẩm đã được đăng bán, vui lòng hoàn tất qua URL đồng ý.");
    } catch (error) {
      // Xử lý lỗi khi có lỗi xảy ra
      setError(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      // Dừng trạng thái loading khi xong
      setLoading(false);
    }
  };
  const handleCancelListing = async (assetId) => {
    setLoading(true); // Hiển thị trạng thái đang tải
    setError(""); // Reset lỗi

    try {
      // Gửi yêu cầu POST để hủy đăng bán tài sản
      const response = await fetch(
        `https://api.gameshift.dev/nx/unique-assets/${assetId}/cancel-sale`,
        {
          method: "POST", // Phương thức POST
          headers: {
            accept: "application/json", // Định dạng trả về là JSON
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8",
          },
        }
      );

      // Kiểm tra nếu phản hồi không OK
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Không thể hủy đăng bán tài sản.";
        setError(`Lỗi: ${errorMessage}`);
        return;
      }

      const data = await response.json();
      const { consentUrl } = data;

      // Điều hướng người dùng đến URL đồng ý
      window.location.href = consentUrl;

      // Thông báo thành công
      alert("Đã hủy đăng bán tài sản, vui lòng hoàn tất qua URL đồng ý.");
    } catch (error) {
      // Xử lý lỗi khi có lỗi xảy ra
      setError(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      // Dừng trạng thái loading khi xong
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
          className="form-control"
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Nhập ID người dùng"
        />
      </div>

      {/* Nút tải danh sách */}
      <button
        onClick={handleFetchItems}
        disabled={loading}
        className="fetch-button"
      >
        {loading ? "Đang tải..." : "Tải các mục của bạn"}
      </button>

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="error-message">{error}</p>}

      {/* Thông tin ví hiển thị bên ngoài */}
      {items.length > 0 && (
        <div className="wallet-info">
          <h3>Thông tin ví</h3>
          {items
            .filter((item) => item.type === "Currency")
            .map((item, index) => (
              <p key={index}>
                {item.item.symbol}: {item.quantity}
              </p>
            ))}
        </div>
      )}

      {/* Hiển thị danh sách mục trong bảng */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : items.length > 0 ? (
        <table className="items-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Giá bán</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => item.type !== "Currency")
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.item.name}</td>
                  <td>{item.item.description}</td>
                  <td>
                    <img
                      src={item.item.imageUrl}
                      alt={item.item.name}
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>
                    <div className="price-input-container">
                      <label htmlFor={`price-${item.item.id}`}>
                        Giá hiện tại:
                      </label>
                      <input
                        type="number"
                        id={`price-${item.item.id}`}
                        value={price[item.item.id] || ""}
                        onChange={(e) =>
                          setPrice({
                            ...price,
                            [item.item.id]: e.target.value, // Cập nhật giá cho mặt hàng cụ thể
                          })
                        }
                        placeholder="Nhập giá"
                      />
                      {/* Dropdown cho chọn currency */}
                      <div className="currency-container">
                        <label htmlFor="currency">Chọn loại tiền tệ: </label>
                        <select
                          id="currency"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="USDC">USDC</option>
                          {/* Có thể thêm các lựa chọn tiền tệ khác */}
                        </select>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      {/* Nút đăng bán */}
                      <button
                        onClick={() => handleListForSale(item.item.id)}
                        disabled={loading}
                      >
                        {loading ? "Đang đăng bán..." : "Đăng bán"}
                      </button>

                      {/* Nút hủy đăng bán */}
                      <button style={{ backgroundColor: "red" }}
                        onClick={() => handleCancelListing(item.item.id)}
                        disabled={loading}
                      >
                        {loading ? "Đang hủy..." : "Hủy đăng bán"}
                      </button>

                      {/* Hiển thị thông báo lỗi nếu có */}
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>Bạn không có mục nào.</p>
      )}
    </div>
  );
};

export default UserItems;
