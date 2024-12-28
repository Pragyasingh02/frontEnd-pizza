import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-4">
          &copy; {new Date().getFullYear()} Pizza Paradise. All rights reserved.
        </p>
        <div className="flex justify-center mb-4 space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <i className="fab fa-facebook-f fa-lg"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <i className="fab fa-linkedin-in fa-lg"></i>
          </a>
        </div>
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/about"  className="hover:underline">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
