import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../../contextApi/ContextApi";

import "./navbar.css"; // Import CSS file

const Navbar = () => {
  const { token,setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
      setToken(null);
      localStorage.removeItem("JWT_token");
      navigate("/");
      setNavbarOpen(false);
      window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ChopURL
        </Link>
        <ul className={`navbar-links ${navbarOpen ? "open" : ""}`}>
          <li>
            <Link
              className={`navbar-link ${path === "/" ? "navbar-active" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`navbar-link ${path === "/about" ? "navbar-active" : ""}`}
              to="/about"
            >
              About
            </Link>
          </li>
          {token && (
            <li>
              <Link
                className={`navbar-link ${path === "/dashboard" ? "navbar-active" : ""}`}
                to="/dashbord"
              >
                Dashboard
              </Link>
            </li>
          )}
          {!token ? (
            <Link to="/register">
              <li className="navbar-button">Sign Up</li>
            </Link>
          ) : (
            <button onClick={handleLogout} className="navbar-button">
              Log Out
            </button>
          )}
        </ul>
        <button onClick={() => setNavbarOpen(!navbarOpen)} className="navbar-toggle">
          {navbarOpen ? <RxCross2 size={24} color="white" /> : <IoIosMenu size={24} color="white" />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
