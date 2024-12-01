import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import LayoutHome from "./components/Layout";
import CreateAsset from "./pages/CreateAsset";
import CreateCollection from "./pages/CreateCollection";
import CreateAccount from "./pages/CreateAccount";
import GameShiftPayment from "./pages/GameShiftPayment";
import HomePage from "./pages/Home";
import PhantomWallet from "./pages/PhantomWallet";
import UserItems from "./pages/UserItems";

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <div>
      <LayoutHome>
        <Switch>
          <Route exact path="/" index component={HomePage} />
          <Route path="/payment" component={GameShiftPayment} />
          <Route path="/wallet" component={PhantomWallet} />
          <Route
            path="/create-account"
            component={() => (
              <CreateAccount
                setAuthToken={setAuthToken}
                setUserId={setUserId}
              />
            )}
          />
          <Route
            path="/create-asset"
            component={() => <CreateAsset authToken={authToken} />}
          />
          <Route
            path="/user-items"
            component={() => (
              <UserItems userId={userId} authToken={authToken} />
            )}
          />
          <Route
            path="/create-collection"
            component={() => <CreateCollection authToken={authToken} />}
          />
        </Switch>
      </LayoutHome>
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
