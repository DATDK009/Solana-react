import React, { useState, useEffect } from "react";
import { apiRequest } from "../../api"; // Import apiRequest từ api.js
import "./styles.css";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [externalWalletAddress, setWallet] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [accounts, setAccounts] = useState([]); // State lưu danh sách tài khoản

  // Hàm tạo tài khoản
  const handleCreateAccount = async (event) => {
    event.preventDefault();

    const userData = {
      referenceId,
      email,
      externalWalletAddress,
    };

    try {
      const response = await apiRequest("POST", userData);
      setMessage("Tạo tài khoản thành công!");
      setError(null); // Xóa thông báo lỗi nếu thành công
      fetchAccounts(); // Fetch lại danh sách tài khoản sau khi tạo tài khoản thành công
      console.log(response);
    } catch (error) {
      setError("Có lỗi xảy ra khi tạo tài khoản.");
      setMessage(""); // Xóa thông báo thành công nếu có lỗi
      console.error(error);
    }
  };

  // Hàm lấy danh sách tài khoản từ API
  const fetchAccounts = async () => {
    try {
      const response = await apiRequest("GET"); // Lấy danh sách tài khoản từ API
      setAccounts(response.data); // Cập nhật danh sách tài khoản vào state
    } catch (error) {
      console.error("Không thể lấy danh sách tài khoản:", error);
    }
  };

  // Dùng useEffect để fetch danh sách tài khoản khi component mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="create-account-container">
      <div className="form-container">
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
          <div className="form-group">
            <label>Địa chỉ ví</label>
            <input
              type="text"
              className="form-control"
              value={externalWalletAddress}
              onChange={(e) => setWallet(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Tạo tài khoản
          </button>
        </form>
      </div>

      <div className="table-container">
        <h3>Danh sách tài khoản</h3>
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Reference ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length > 0 ? (
              accounts.map((account, index) => (
                <tr key={index}>
                  <td>{account.referenceId}</td>
                  <td>{account.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Không có tài khoản nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateAccount;
