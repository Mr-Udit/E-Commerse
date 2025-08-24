import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/login");
    alert("Logout successful");
  };
  const handleSubMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <header>
      <div className="container">
        <div>
          <Link to="/" className="logo">
            E Store
          </Link>
        </div>
        <div className="nav-links">
          <ul>
            <li className="nav-link">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">products</Link>
            </li>
            <li>
              <Link to="/catagories">catagories</Link>
            </li>
            <li style={{ display: token ? "none" : "block" }}>
              <Link to="/login">{token ? "" : "Login"}</Link>
            </li>
            <li>
              <Link to="/cart">cart</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
            <li className="triger">
              <Link style={{ display: token ? "block" : "none" }}>
                <span onClick={handleSubMenu}>user</span>
              </Link>
                <div
                  className="submenu"
                  style={{ display: isOpen ? "flex" : "none" }}
                >
                  <ul>
                    <li style={{ display: token ? "block" : "none" }}>
                      <span>{localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role || "user" : ""}</span>
                    </li>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/dashboard">dashboard</Link>
                    </li>
                    <li>
                      <span onClick={handleLogout}>Logout</span>
                    </li>
                  </ul>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
