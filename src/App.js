import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PhantomWallet from "./PhantomWallet";
import CreateAccount from "./CreateAccount";
import CreateAsset from "./CreateAsset";
import Login from "./Login";
import CreateCollection from "./CreateCollection"; // Import CreateCollection
import UserItems from "./UserItems"; // Import UserItems

const App = () => {
  const [authToken, setAuthToken] = useState(null); // Token xác thực
  const [userId, setUserId] = useState(null); // ID người dùng

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/wallet">Phantom Wallet</Link> | 
          <Link to="/create-account">Tạo Tài Khoản</Link> | 
          <Link to="/user-items">Mục của bạn</Link> |
          <Link to="/create-asset">Tạo Tài Sản</Link> |
          <Link to="/create-collection">Tạo Collection</Link> {/* Link tới CreateCollection */}
        </nav>
        <Switch>
          <Route 
            exact 
            path="/" 
            render={() => (
              <div>
                <h1>Welcome to the Solana App</h1>
                {!authToken ? (
                  <Login 
                    setAuthToken={setAuthToken} 
                    setUserId={setUserId} 
                  />
                ) : (
                  <CreateCollection authToken={authToken} />
                )}
              </div>
            )}
          />
          <Route path="/wallet" component={PhantomWallet} />
          <Route 
            path="/create-account" 
            component={() => <CreateAccount setAuthToken={setAuthToken} setUserId={setUserId} />} 
          />
          <Route 
            path="/create-asset" 
            render={() => <CreateAsset authToken={authToken} />} 
          />
          <Route 
            path="/user-items" 
            render={() => (
              <UserItems userId={userId} authToken={authToken} />
            )} 
          />
          <Route 
            path="/create-collection" 
            render={() => <CreateCollection authToken={authToken} />} // Đưa vào CreateCollection
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
