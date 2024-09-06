import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css'; // Import the CSS file
import LoadingSpinner from '../../global/loadingSpinner/LoadingSpinner'; // Import the global LoadingSpinner component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

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
const userRoles = {
  USER: "USER",
  MANGER: "MANGER",
  ADMIN: "ADMIN",
}

const Profile = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const [formData, setFormData] = useState({
    userName: '',
    gmail: '',
    age: '',
    role: ''
  });
  const [hasChanged, setHasChanged] = useState(false);

  const handleLogout = () => {
    // Clear cookies
    document.cookie = 'authToken=; path=/; max-age=0';
    document.cookie = 'userId=; path=/; max-age=0';
    window.location.href = '/login';
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const cookieToken = getCookie('authToken');
      const userId = getCookie('userId');

      if (!cookieToken || !userId) {
        setErrorMessage('Authentication error: Cookies are missing or expired. Please log in again.');
        setLoading(false);
        handleLogout();
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${cookieToken}`
          }
        });
        const userData = response.data.data.user;
        setUser(userData);
        setFormData({
          userName: userData.userName,
          gmail: userData.gmail,
          age: userData.age,
          role: userData.role
        });
      } catch (error) {
        console.error('Failed to fetch profile', error);
        setErrorMessage('Failed to fetch profile: Unauthorized access. Please check your login status.');
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Compare formData with user data to check for changes
    if (user) {
      setHasChanged(
        JSON.stringify({ ...user, [name]: value }) !== JSON.stringify(user)
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!hasChanged) {
      toast.info('No changes detected. Please modify the fields before submitting.');
      return; // Prevent form submission
    }
    const cookieToken = getCookie('authToken');
    const userId = getCookie('userId');

    try {
      const response = await axios.put(`${apiUrl}/api/users/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${cookieToken}`
        }
      });
      setUser(response.data.data.user);
      toast.success('Profile updated successfully!');
      setHasChanged(false)
    } catch (error) {
      console.error('Failed to update profile', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className="profileContainer">
      <ToastContainer />

      <h1>Profile Page</h1>
      <div className="profileDetails">
        {user.picture && !imageError ? (
          <img
            src={user.picture}
            alt="Profile"
            className="profilePicture"
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          !imageError && <LoadingSpinner />
        )}
        <p><strong>Name:</strong> {user.userName}</p>
        <p><strong>Email:</strong> {user.gmail}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <form className="profileForm" onSubmit={handleUpdate}>
        <h2>Update Profile</h2>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="Age"
          min="12"
          max="80"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="roleSelect"
        >
          {Object.values(userRoles).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <button type="submit" className="updateButton">Update</button>
      </form>
      <button className="logoutButton" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
