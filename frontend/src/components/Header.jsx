import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="better-header">
      <div className="logo">
        <NavLink to="/" className="logo-text">
          🎓 ResultApp
        </NavLink>
      </div>
      <nav className="nav-menu">
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>
        <NavLink to="/marks" className="nav-item">
          Marks
        </NavLink>
        <NavLink to="/records" className="nav-item">
          Records
        </NavLink>
        <NavLink to="/about" className="nav-item">
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
