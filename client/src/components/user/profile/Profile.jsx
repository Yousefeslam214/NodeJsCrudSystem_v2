import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePicture from './ProfilePicture';
import ProfileDetails from './ProfileDetails';
import ProfileForm from './ProfileForm';
import './profile.css';
import LoadingSpinner from '../../global/loadingSpinner/LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRoles } from './userRoles'; // Import userRoles from the new file
// import { setUser, clearUser } from '../../../redux/userSlice'; // Import action creators
// import { useSelector, useDispatch } from 'react-redux';
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
  // const user = useSelector((state) => state.user); // Access user from Redux store
  // const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({

    userName: '',
    gmail: '',
    age: 0,
    role: ''
  });
  const [hasChanged, setHasChanged] = useState(false);

  // const handleLogout = () => {
  //   document.cookie = 'authToken=; path=/; max-age=0';
  //   document.cookie = 'userId=; path=/; max-age=0';
  //   // dispatch(clearUser()); // Clear user from Redux store
  //   window.location.href = '/login';
  // };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const userRedux = useSelector((state) => state.user.user); // Accessing user data from Redux state
  const loadingRedux = useSelector((state) => state.user.loading); // Checking loading state
  const errorRedux = useSelector((state) => state.user.error); // Checking error state
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
      if (!cookieToken && !userId) {
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
        // const userData = userRedux;
        console.log(userData)
        console.log(userRedux)
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
        // Logout();
        Logout()
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  // }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }));
    if (user) {
      setHasChanged(
        JSON.stringify({ ...user, [name]: name === 'age' ? Number(value) : value }) !== JSON.stringify(user)
      );
    }
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value
  //   }));
  //   if (user) {
  //     setHasChanged(
  //       JSON.stringify({ ...user, [name]: value }) !== JSON.stringify(user)
  //     );
  //   }
  // };

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
      <ProfilePicture
        picture={user.picture}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      <ProfileDetails user={user} />
      <ProfileForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleUpdate={handleUpdate}
        userRoles={userRoles}
      />
      <button className="logoutButton" onClick={Logout}>Logout</button>
    </div>
  );
};

export default Profile;
