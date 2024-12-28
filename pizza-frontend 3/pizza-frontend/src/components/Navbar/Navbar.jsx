import React, { useContext, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FiUser, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import logo from '../../assets/logoImg1.png';
import logoname from '../../assets/logoname.png';
import profilePic from '../../assets/user.png'; 

import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const { getCartItems } = useContext(CartContext);

  const cartItems = getCartItems();
  const uniquePizzaCount = cartItems.length;

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => { 
    logout();
    navigate("/");
    toast.info("Logged out successfully");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="navbar flex items-center h-[80px] pl-4 pr-8 justify-between shadow-custom-blue">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="pl-2 h-[70px] w-[150%]" /> 
          <img src={logoname} alt="logoname" className="h-[54px] w-[100%] ml-2 hidden md:block" />
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex pr-4 justify-between items-center">
        <Link to="/cart">
          <div className="flex text-3xl pr-6 mt-1 relative">
            <IoCartOutline className="text-orange-500" />
            {uniquePizzaCount > 0 && (
              <span className="bg-red-500 absolute bottom-3 right-2 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {uniquePizzaCount}
              </span>
            )}
          </div>
        </Link>
        
        {auth ? (
          <div className="relative flex items-center">
            <img
              src={profilePic} 
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                <Link to="/profile">
                  <p className="dropdown-item">Profile</p>
                </Link>
                <Link to="/orders">
                  <p className="dropdown-item">Orders</p>
                </Link>
                <Link to="/contact">
                  <p className="dropdown-item">Contact</p>
                </Link>
                <button onClick={handleLogout} className="dropdown-item block w-[100%] text-left">
                  Logout
                </button>
              </div>
            )}
            <p className="ml-2 text-lg">Welcome, <span className="font-semibold"> {auth.username || "User"}</span></p>
          </div>
        ) : (
          <div className="flex">
            <Link to="/register">
              <p className="mr-4 bg-orange-500 cursor-pointer rounded-md pl-2 pr-2">
                <button className="flex py-2 items-center text-yellow-50">
                  <FiUser className="mr-2" />
                  Register
                </button>
              </p>
            </Link>
            <Link to="/login">
              <p className="mr-2 bg-orange-500 cursor-pointer rounded-md pl-2 pr-2">
                <button className="flex py-2 items-center text-yellow-50">
                  <FiUser className="mr-2" />
                  Login
                </button>
              </p>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-3xl">
          <FiMenu />
        </button>
        {mobileMenuOpen && (
          <div className="mobile-menu absolute right-0 top-[80px] w-full bg-white shadow-lg rounded-md">
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
              <p className="mobile-menu-item">
                {/* <IoCartOutline className="mr-2 text-orange-500" /> */}
                Cart ({uniquePizzaCount})
              </p>
            </Link>
            {auth ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <p className="mobile-menu-item">Profile</p>
                </Link>
                <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
                  <p className="mobile-menu-item">Orders</p>
                </Link>
                <button onClick={handleLogout} className="mobile-menu-item">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <p className="mobile-menu-item">Register</p>
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <p className="mobile-menu-item">Login</p>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
