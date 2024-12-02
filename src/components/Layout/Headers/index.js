import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import icon tìm kiếm

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Cập nhật giá trị tìm kiếm
  };

  const handleSearchSubmit = () => {
    // Thực hiện tìm kiếm khi người dùng bấm nút tìm kiếm
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav
      style={{
        padding: "10px 20px", // Padding cho thanh điều hướng
        display: "flex",
        justifyContent: "space-between", // Canh đều các phần tử
        alignItems: "center", // Canh giữa các phần tử theo chiều dọc
      }}
    >
      <h3
        style={{
          fontSize: "24px", // Kích thước chữ
          margin: "0", // Xóa margin mặc định
          fontFamily: "'Arial', sans-serif", // Font chữ
        }}
      >
        Web ứng dụng Solana và GameShift
      </h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc", // Đường viền cho container
          padding: "5px",
          borderRadius: "20px", // Bo góc container
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            border: "none", // Xóa viền của input
            outline: "none", // Xóa viền khi chọn
            padding: "5px 10px",
            fontSize: "16px",
            borderRadius: "20px",
          }}
        />
        <button
          onClick={handleSearchSubmit}
          style={{
            border: "none",
            padding: "5px 10px",
            marginLeft: "10px",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
          }}
        >
          <FaSearch />
        </button>
      </div>
    </nav>
  );
};

export default Header;
