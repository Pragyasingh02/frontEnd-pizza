import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();

    const userDetails = { username, password };

    try {
      const response = await axios.post('http://localhost:8081/auth/token', userDetails);
      const token = Object.keys(response.data)[0]; 
      const username = response.data[token]; 

      const response1 = await axios.get(`http://localhost:8081/customer/name/${username}`)
      const userId = response1.data.customerId;
      const userAddress = response1.data.address;
      const userPhoneNo = response1.data.phoneNo;
      const userEmail = response1.data.email;

      login(token, username, userId, userAddress, userPhoneNo, userEmail); 
      toast.success("Logged in successfully");
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Invalid credentials`);
      } else {
        toast.error("Login failed. Please try again."); 
      }
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleForm}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="button1" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
