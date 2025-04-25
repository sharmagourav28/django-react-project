import React from "react";
import { Link } from "react-router-dom"; // Using react-router for navigation
import "./header.css"; // Import CSS for styling

const Header = () => {
  return (
    <header className="header-container">
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/marks" className="nav-link">
              Marks Page
            </Link>
          </li>
          <li>
            <Link to="/records" className="nav-link">
              Records
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
