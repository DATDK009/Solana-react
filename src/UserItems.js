import React, { useState } from "react";

const UserItems = ({ authToken }) => {
  const [userId, setUserId] = useState(""); // State để lưu userId từ input
  const [items, setItems] = useState([]); // State để lưu dữ liệu mục của người dùng
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(""); // Trạng thái lỗi

  const handleFetchItems = async () => {
    // Kiểm tra nếu thiếu userId hoặc authToken thì thông báo lỗi
    if (!userId) {
      setError("Vui lòng nhập ID người dùng và xác thực.");
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
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmZmQ2ZDc0Ny1jN2VhLTQ2NzktOGM3NS01YTVhYWVlMmUxNDkiLCJzdWIiOiJiMjg0ZTg3NC1lMjg4LTRkNmItOWM1YS04ZDMxNjdiMTNhYzMiLCJpYXQiOjE3MzIyNzg2MjR9.FStOXBNWl0bx5w8WO5YtrQQPagdMOuUs6Q9mBlTvbGg", // API Key
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu các mục của người dùng.");
      }

      const data = await response.json();
      setItems(data.items || []); // Lưu danh sách mục
    } catch (error) {
      setError(error.message); // Hiển thị thông báo lỗi nếu có
    } finally {
      setLoading(false); // Đặt lại trạng thái loading
    }
  };

  return (
    <div>
      <h2>Các mục của bạn</h2>

      {/* Input cho userId */}
      <div>
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
      <button onClick={handleFetchItems} disabled={loading}>
        {loading ? "Đang tải..." : "Tải các mục của bạn"}
      </button>

      {/* Hiển thị lỗi nếu có */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Hiển thị danh sách mục của người dùng */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name || "Không rõ tên mục"}</li>
          ))}
        </ul>
      ) : (
        <p>Bạn không có mục nào.</p>
      )}
    </div>
  );
};

export default UserItems;
