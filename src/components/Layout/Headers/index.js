import React from "react";
import { FaSearch } from "react-icons/fa"; 

const Header = () => {
  return (
    <nav className="topbar">
      {/* Search Form */}
      <form className="topbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for..."
            aria-label="Search"
          />
          <div className="search-button">
            <button className="btn btn-primary" type="button">
              <FaSearch className="icon-sm" />
            </button>
          </div>
        </div>
      </form>
    </nav>
  );
};

export default Header;
