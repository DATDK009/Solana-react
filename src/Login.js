import React, { useState } from "react";

const Login = ({ setAuthToken }) => {
  const [referenceId, setReferenceId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("https://api.gameshift.dev/login-by-reference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmZmQ2ZDc0Ny1jN2VhLTQ2NzktOGM3NS01YTVhYWVlMmUxNDkiLCJzdWIiOiJiMjg0ZTg3NC1lMjg4LTRkNmItOWM1YS04ZDMxNjdiMTNhYzMiLCJpYXQiOjE3MzIyNzg2MjR9.FStOXBNWl0bx5w8WO5YtrQQPagdMOuUs6Q9mBlTvbGg", // API Key
        },
        body: JSON.stringify({ referenceId }),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại.");
      }

      const data = await response.json();
      setAuthToken(data.token); // Lưu token đăng nhập cho các yêu cầu API sau
      alert("Đăng nhập thành công!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Đăng nhập bằng Reference ID</h2>
      <input
        type="text"
        value={referenceId}
        onChange={(e) => setReferenceId(e.target.value)}
        placeholder="Nhập Reference ID"
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
