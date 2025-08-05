import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side: Buttons */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            className="hidden md:block px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative flex items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only">Cart</span>
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden px-4 pb-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block py-2 text-gray-700 border-b hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
