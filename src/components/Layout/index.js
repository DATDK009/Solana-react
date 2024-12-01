import { Link } from "react-router-dom";

const LayoutHome = ({ children }) => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |<Link to="/wallet">Phantom Wallet</Link> |
        <Link to="/create-account">Tạo Tài Khoản</Link> |
        <Link to="/user-items">Mục của bạn</Link> |
        <Link to="/create-asset">Tạo Tài Sản</Link> |
        <Link to="/create-collection">Tạo Collection</Link>
      </nav>
      {children}
    </div>
  );
};

export default LayoutHome;
