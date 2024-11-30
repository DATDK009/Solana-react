import React, { useState } from "react";
import { apiRequest } from "./api"; // Import apiRequest từ api.js
import './CreateAccount.css'

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [referenceId, setReferenceId] = useState(""); // Thêm state cho referenceId
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    // Dữ liệu cần gửi để tạo tài khoản
    const userData = {
      referenceId, // Đảm bảo có referenceId
      email, // Sử dụng email người dùng nhập vào
    };

    try {
      const response = await apiRequest("POST", userData); // Gọi API tạo người dùng
      setMessage("Tạo tài khoản thành công!");
      console.log(response); // Log kết quả từ API, có thể chứa thông tin người dùng mới tạo
    } catch (error) {
      setError("Có lỗi xảy ra khi tạo tài khoản.");
      console.error(error);
    }
  };

  return (
    <div className="create-account-container">
      <h2>Đăng ký tài khoản</h2>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleCreateAccount}>
        <div>
          <label>Reference ID</label>
          <input
            type="text"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Tạo tài khoản</button>
      </form>
    </div>
  );
};

export default CreateAccount;
