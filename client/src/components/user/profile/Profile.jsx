import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePicture from './ProfilePicture';
import ProfileDetails from './ProfileDetails';
import ProfileForm from './ProfileForm';
import './profile.css';
import LoadingSpinner from '../../global/loadingSpinner/LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRoles } from './userRoles';
import { useSelector } from 'react-redux';
import { Logout } from '../../global/logout/Logout';

const apiUrl = import.meta.env.VITE_API_URL;

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
 const [loading, setLoading] = useState(true);
 const [imageError, setImageError] = useState(false);
 const [imageLoading, setImageLoading] = useState(true);
 const [user, setUser] = useState(null);
 const [formData, setFormData] = useState({
  userName: '',
  gmail: '',
  age: 0,
  role: '',
  picture: ''
 });
 const [hasChanged, setHasChanged] = useState(false);

 const handleImageError = () => {
  setImageError(true);
  setImageLoading(false);
 };

 const handleImageLoad = () => {
  setImageLoading(false);
 };

 // Function to handle image change (upload)
 const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate file size (1MB max)
  if (file.size > 1024 * 1024) {
   toast.error('Image size exceeds 1MB. Please select a smaller file.');
   return;
  }

  const imageFormData = new FormData();
  imageFormData.append('image', file);

  const cookieToken = getCookie('authToken');
  const userId = getCookie('userId');

  try {
//    console.log("step1")
   const response = await axios.put(`${apiUrl}/api/users/${userId}`
    //  , imageFormData, {
    //  // headers: {
    //  //  'Authorization': `Bearer ${cookieToken}`,
    //  //  'Content-Type': 'multipart/form-data'
    //  // }
    // }
   );

   const updatedUser = { ...user, picture: response.data.data.picture };
   setUser(updatedUser);
   toast.success('Profile picture updated successfully!');
  } catch (error) {
   console.error('Failed to update profile picture', error);
   toast.error('Failed to update profile picture. Please try again.');
  }
 };
 useEffect(() => {
  const fetchProfile = async () => {
   const cookieToken = getCookie('authToken');
   const userId = getCookie('userId');

   if (!cookieToken || !userId) {
    setErrorMessage('Authentication error: Cookies are missing or expired. Please log in again.');
    setLoading(false);
    Logout();
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
    Logout();
   } finally {
    setLoading(false);
   }
  };

  fetchProfile();
 }, []);

 const handleInputChange = (e) => {
  const { name, value, files } = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: name === 'age' ? Number(value) : value
  }));
  if (files) {
   setFormData({
    ...formData,
    [name]: files[0], // Store the file object in formData
   });
  }
  if (user) {
   setHasChanged(
    JSON.stringify({ ...user, [name]: name === 'age' ? Number(value) : value }) !== JSON.stringify(user)
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
     'Authorization': `Bearer ${cookieToken}`,
     'Content-Type': 'multipart/form-data',

    }
   });
   setUser(response.data.data.user);
   toast.success('Profile updated successfully!');
   setHasChanged(false);
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
   <ProfilePicture
    picture={user.picture}
    onError={handleImageError}
    onLoad={handleImageLoad}
    onChange={handleImageChange}
   />
   <ProfileDetails user={user} />
   <ProfileForm
    formData={formData}
    handleInputChange={handleInputChange}
    handleUpdate={handleUpdate}
    userRoles={userRoles}
    handleImageChange={handleImageChange}

   />
   <button className="logoutButton" onClick={Logout}>Logout</button>
  </div>
 );
};

export default Profile;
