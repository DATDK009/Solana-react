import React, { useState } from "react";
import { apiRequest } from "./api"; // Import apiRequest từ api.js
import "./CreateAccount.css";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    const userData = {
      referenceId,
      email,
    };

    try {
      const response = await apiRequest("POST", userData);
      setMessage("Tạo tài khoản thành công!");
      setError(null); // Xóa thông báo lỗi nếu thành công
      console.log(response);
    } catch (error) {
      setError("Có lỗi xảy ra khi tạo tài khoản.");
      setMessage(""); // Xóa thông báo thành công nếu có lỗi
      console.error(error);
    }
  };

  return (
    <div className="create-account-container">
      <h2>Đăng ký tài khoản</h2>
      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleCreateAccount}>
        <div className="form-group">
          <label>Reference ID</label>
          <input
            type="text"
            className="form-control"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Tạo tài khoản
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
