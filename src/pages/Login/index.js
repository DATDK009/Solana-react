import React, { useState } from "react";
import "./styles.css"; // Đường dẫn đến file CSS

const Login = ({ setAuthToken }) => {
  const [username, setUsername] = useState(""); // Trạng thái cho tên đăng nhập
  const [password, setPassword] = useState(""); // Trạng thái cho mật khẩu
  const [error, setError] = useState(""); // Trạng thái cho thông báo lỗi
  const [loading, setLoading] = useState(false); // Trạng thái tải

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.gameshift.dev/nx/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Dữ liệu gửi đi
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại."); // Nếu không thành công
      }

      const data = await response.json();
      setAuthToken(data.token); // Lưu token đăng nhập
      alert("Đăng nhập thành công!"); // Thông báo thành công
    } catch (error) {
      setError(error.message); // Hiển thị thông báo lỗi
    } finally {
      setLoading(false); // Kết thúc trạng thái tải
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Cập nhật tên người dùng
        placeholder="Nhập tên đăng nhập"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Cập nhật mật khẩu
        placeholder="Nhập mật khẩu"
        className="input-field"
      />
      <button onClick={handleLogin} disabled={loading} className="login-button">
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Hiển thị lỗi nếu có */}
    </div>
  );
};

export default Login;
