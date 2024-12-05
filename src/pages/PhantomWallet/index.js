import React, { useState, useEffect } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import "./PhantomWallet.css";
const PhantomWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

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

  return (
    <div>
      <h2>Kết nối Phantom Wallet</h2>
      {walletAddress ? (
        <div>
          <p>Đã kết nối: {walletAddress}</p>
          <p>Số dư: {balance !== null ? `${balance} SOL` : "Đang tải..."}</p>
          <button onClick={disconnectWallet}>Đăng xuất</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Kết nối</button>
      )}
    </div>
  );
};

export default PhantomWallet;
