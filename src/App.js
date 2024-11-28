import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from "react-router-dom";
import GameShiftPayment from './GameShiftPayment';
import PhantomWallet from "./PhantomWallet";
import CreateAccount from "./CreateAccount";
import CreateAsset from "./CreateAsset";
import CreateCollection from "./CreateCollection";
import UserItems from "./UserItems";
import "./App.css";

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [items, setItems] = useState([]);
  
  const history = useHistory(); // Sử dụng useHistory

  const fetchItems = async () => {
    try {
      const response = await fetch('https://api.gameshift.dev/nx/items?forSale=true', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8' // Thay thế bằng khóa API của bạn
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
      if (Array.isArray(result.data)) {
        setItems(result.data);
      } else {
        console.error('Dữ liệu không phải là mảng:', result.data);
      }
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    }
  };

  const handleBuyClick = (item) => {
    // Chuyển hướng đến trang GameShiftPayment với thông tin item
    history.push({
      pathname: '/payment',
      state: { item: item },
    });
  };
  const handleCancelListing = async (itemId) => {
    try {
      // Kiểm tra xem itemId có hợp lệ không
      if (!itemId) {
        console.error("Không có ID tài sản.");
        return;
      }
  
      // Gửi yêu cầu POST tới API
      const response = await fetch(`https://api.gameshift.dev/nx/unique-assets/${itemId}/cancel-sale`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8',
        }
      });
  
      // Kiểm tra nếu phản hồi không thành công
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Lỗi khi gửi yêu cầu:', errorData);
        throw new Error('Có lỗi khi hủy đăng bán');
      }
  
      // Xử lý kết quả phản hồi
      const result = await response.json();
      console.log('Kết quả hủy đăng bán:', result);
  
      // Kiểm tra nếu có URL đồng ý và chuyển hướng người dùng
      if (result.consentUrl) {
        window.location.href = result.consentUrl;
      } else {
        console.error('Không có URL đồng ý để hoàn tất việc hủy tài sản');
      }
  
    } catch (error) {
      // Xử lý lỗi chung
      console.error('Có lỗi xảy ra:', error);
    }
  };
  
  
  
  
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/wallet">Phantom Wallet</Link> | 
        <Link to="/create-account">Tạo Tài Khoản</Link> | 
        <Link to="/user-items">Mục của bạn</Link> |
        <Link to="/create-asset">Tạo Tài Sản</Link> |
        <Link to="/create-collection">Tạo Collection</Link>
      </nav>
      <Switch>
        <Route 
          exact 
          path="/" 
          render={() => (
            <div>
              <h1>Welcome to the Solana Market</h1>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Giá (USD)</th>
                    <th>Mô tả</th>
                    <th>Chủ sở hữu</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.item.id}>
                      <td><img alt="" className="rounded image" src={item.item.imageUrl} /></td>
                      <td>{item.item.name}</td>
                      <td>{item.item.priceCents / 100} USD</td>
                      <td>{item.item.description}</td>
                      <td>{item.item.owner.referenceId}</td>
                      <td>
                        <button className="btn btn-primary me-2 mb-2" onClick={() => handleBuyClick(item)}>Mua</button>
                        <button 
  className="btn btn-danger" 
  onClick={() => {
    const confirmed = window.confirm("Bạn chắc chắn muốn hủy đăng bán sản phẩm này?");
    if (confirmed) {
      handleCancelListing(item.item.id); // Thực hiện xóa nếu người dùng xác nhận
    }
  }}
>
  Hủy đăng bán
</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        />
        <Route path="/payment" component={GameShiftPayment} />
        <Route path="/wallet" component={PhantomWallet} />
        <Route 
          path="/create-account" 
          component={() => <CreateAccount setAuthToken={setAuthToken} setUserId={setUserId} />} 
        />
        <Route path="/create-asset" component={() => <CreateAsset authToken={authToken} />} />
        <Route path="/user-items" component={() => <UserItems userId={userId} authToken={authToken} />} />
        <Route path="/create-collection" component={() => <CreateCollection authToken={authToken} />} />
      </Switch>
    </div>
  );
};

// Bọc component App trong Router
const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;