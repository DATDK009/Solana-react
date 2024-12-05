import React, { useState, useEffect } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { FaSearch } from "react-icons/fa"; // Import icon tìm kiếm

const Header = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm

  // Kết nối với mạng Solana (Devnet, Testnet hoặc Mainnet)
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Kiểm tra và thiết lập trạng thái khi ứng dụng khởi động
  useEffect(() => {
    const savedWallet = localStorage.getItem("walletAddress");
    if (savedWallet) {
      setWalletAddress(savedWallet);
      fetchBalance(savedWallet);
    }
  }, []);

  // Kết nối với ví
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const publicKey = response.publicKey.toString();
        setWalletAddress(publicKey);

        // Lưu địa chỉ ví vào localStorage
        localStorage.setItem("walletAddress", publicKey);

        // Lấy số dư ngay sau khi kết nối
        await fetchBalance(publicKey);
      } catch (error) {
        console.error("Kết nối ví thất bại:", error);
      }
    } else {
      alert("Phantom Wallet không được cài đặt!");
    }
  };

  // Đăng xuất
  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);

    // Xóa địa chỉ ví khỏi localStorage
    localStorage.removeItem("walletAddress");
  };

  // Hàm lấy số dư ví
  const fetchBalance = async (publicKey) => {
    try {
      const lamports = await connection.getBalance(new PublicKey(publicKey));
      const sol = lamports / 1e9; // Chuyển đổi từ lamports sang SOL
      setBalance(sol);
    } catch (error) {
      console.error("Lỗi khi lấy số dư:", error);
    }
  };

  // Xử lý tìm kiếm
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Cập nhật giá trị tìm kiếm
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div>
      {/* Header */}
      <nav
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            margin: "0",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          Web ứng dụng Solana và GameShift
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              border: "none",
              outline: "none",
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

      {/* Phantom Wallet Info */}
      <div style={{
        display: "flex",
        alignItems: "center"
        }}>
        {walletAddress ? (
          <div>
            <div>Số dư: {balance !== null ? `${balance} SOL` : "Đang tải..."}</div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
        <div>
          {walletAddress ? (
            <button onClick={disconnectWallet}>Đăng xuất</button>
          ) : (
            <button onClick={connectWallet}>Kết nối ví</button>
          )}
        </div>
      </nav>

    </div>
  );
};

export default Header;
