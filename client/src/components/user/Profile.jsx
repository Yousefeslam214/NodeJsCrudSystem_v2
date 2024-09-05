import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

const Profile = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // State to manage loading
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // Clear cookies
    document.cookie = 'authToken=; path=/; max-age=0';
    document.cookie = 'userId=; path=/; max-age=0';
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const cookieToken = getCookie('authToken');
      const userId = getCookie('userId');

      if (!cookieToken || !userId) {
        setErrorMessage('Authentication error: Cookies are missing or expired. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${cookieToken}`
          }
        });
        setUser(response.data.data.user);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        setErrorMessage('Failed to fetch profile: Unauthorized access. Please check your login status.');
      } finally {
        setLoading(false); // Stop loading after the fetch attempt
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>; // Display loading message while data is being fetched
  if (errorMessage) return <p>{errorMessage}</p>; // Display error message if there is one

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.userName}</p>
      <p>Email: {user.gmail}</p>
      <p>Age: {user.age}</p>
      <p>Role: {user.role}</p>
      {user.picture && <img src={user.picture} alt="Profile" />}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
