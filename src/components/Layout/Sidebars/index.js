import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <i className="fas fa-store"></i> {/* Thay đổi icon nếu cần */}
        </div>
        <div className="name-logo">
          CNTT <sup>8</sup>
        </div>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Chợ sản phẩm
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create-account" className="nav-link">
              Tạo Tài Khoản
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user-items" className="nav-link">
              Thông tin tài khoản
            </Link>
          </li>
          <li className="nav-item has-submenu">
            <span className="nav-link">Thêm mới sản phẩm</span>
            <ul className="submenu">
              <li className="submenu-item">
                <Link to="/create-asset" className="submenu-link">
                  Tạo Tài Sản
                </Link>
              </li>
              <li className="submenu-item">
                <Link to="/create-collection" className="submenu-link">
                  Tạo Collection
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
