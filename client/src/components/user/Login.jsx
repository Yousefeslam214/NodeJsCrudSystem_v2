import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './login.css'; // Import the CSS file
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to get a cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  useEffect(() => {
    // Check if user is already logged in
    const token = getCookie('authToken');
    const userId = getCookie('userId');
    if (token && userId) {
      toast.success('You are already logged in!');
      navigate('/profile'); // Redirect to profile if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/users/login`,
        { gmail, password },
        { withCredentials: true }
      );
      const { token } = response.data.data;
      const { id } = response.data.data;
      // console.log(id);
      // console.log(token);
      document.cookie = `userId=${id}; path=/; max-age=${60 * 60 * 24 * 7}`;
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;

      toast.success('Login successful!');
      navigate('/profile');
      window.location.reload(); // Restart the website
      // setTimeout(() => {
      // }, 10);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <Toaster />
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Gmail"
          name="gmail"
          required
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
