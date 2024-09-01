import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


// Function to get a cookie by name
function getCookie(name) {
  // Get the cookies as a string 
  const value = `; ${document.cookie}`;
  // console.log(`value ${value}`)
  // console.log(document.cookie)
  // Split the cookies string into individual cookies
  const parts = value.split(`; ${name}=`);

  // If the desired cookie exists, return its value
  if (parts.length === 2) {
    return parts.pop().split(';').shift(); // Split and return the value part of the cookie
  }

  return null; // Return null if the cookie is not found
}




const Profile = () => {
  const [errorMessage, setErrorMessage] = useState('');


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
        return; // Stop further execution if cookies are missing
      }
      if (!cookieToken && !userId) {
        setErrorMessage('Please log in you dont login.');
        return; // Stop further execution if cookies are missing
      }
      try {

        const response = await axios.get(`${apiUrl}/api/users/${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${cookieToken}` // Send the token in the Authorization header
            }
          });
        setUser(response.data.data.user);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);
  if (errorMessage) return <p>{errorMessage}</p>;
  if (!user) return <p>Loading...</p>;
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.userName}</p>
      <p>Email: {user.gmail}</p>
      <p>Age: {user.age}</p>
      <p>Role: {user.role}</p>
      <p>Profile Picture: <img src={user.picture} alt="Profile" /></p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
