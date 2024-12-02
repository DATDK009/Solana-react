import React from "react";
import Header from "./Headers";
import Sidebar from "./Sidebars";
import Footer from "./Footers";

const LayoutHome = ({ children }) => {
  return (
    <div className="layout">
      {/* Main Section with Sidebar and Content */}
      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar className="sidebar" />

        {/* Main Content */}
        <div className="content-wrapper">
          <Header className="header" />
          <main className="content">{children}</main>
          {/* Footer */}
          <Footer className="footer" />
        </div>
      </div>
    </div>
  );
};

export default LayoutHome;

// import { Link } from "react-router-dom";

// const LayoutHome = ({ children }) => {
//   return (
//     <div>

//       <nav>
//         <Link to="/">Home</Link> |<Link to="/wallet">Phantom Wallet</Link> |
//         <Link to="/create-account">Tạo Tài Khoản</Link> |
//         <Link to="/user-items">Mục của bạn</Link> |
//         <Link to="/create-asset">Tạo Tài Sản</Link> |
//         <Link to="/create-collection">Tạo Collection</Link>
//       </nav>
//       {children}
//     </div>
//   );
// };

// export default LayoutHome;
