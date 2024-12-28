import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Register.css'; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Valid email is required";
    if (!number || number.length < 10) errors.number = "Phone number must be at least 10 digits";
    if (!address) errors.address = "Address is required";
    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must contain at least one special character";
    }

    return errors;
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({}); 

    const userData = {
      name,
      email,
      password,
      number,
      address,
    };

    try {
      await axios.post('http://localhost:8081/auth/register', userData);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="background-image"></div>
      <div className="form-container">
        <h2 className="form-heading">Register</h2>
        <form onSubmit={handleForm}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="number">Phone Number</label>
            <input
              type="text"
              id="number"
              className={`form-input ${errors.number ? 'error' : ''}`}
              placeholder="Enter your phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            {errors.number && <p className="error-text">{errors.number}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className={`form-input ${errors.address ? 'error' : ''}`}
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="submit-button"
          >
            Register
          </button>
        </form>
      </div>

      {loading && (
        <div className="loading-overlay">
          {/* You can replace this with a spinner component if desired */}
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Register;

