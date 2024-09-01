const apiUrl = import.meta.env.VITE_API_URL;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';



// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const value = `${document.cookie}`;
  const parts = value;
  if (parts) return parts;
  return null;
}




const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // // Set a cookie when the component mounts
    // setCookie('username', 'JohnDoe', 7);

    // // Retrieve and log the cookie value
    // const username = getCookie('token');
    // console.log('Username:', username);



    const token = Cookies.get('token');
    const cookieToken = getCookie('authToken');

    console.log("Token from cookies:");  // Log the token
    // console.log(token);  // Log the token
    console.log(cookieToken);  // Log the token
    // Fetch user profile from API
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/`); // Replace with your API endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default Profile;
