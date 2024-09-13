import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './register.css'; // Import the new CSS file

const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
 const [formData, setFormData] = useState({
  userName: '',
  gmail: '',
  password: '',
  age: '',
  role: 'USER', // Default role; you can change it or add role options
  picture: null, // State for picture
 });

 const navigate = useNavigate();

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: value,
  }));
 };

 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
   // Check if the file size exceeds 1MB
   if (file.size / 1024 / 1024 > 1) {
    toast.info('Image is too large. Please choose an image under 1MB.');
    // Clear the input field
    e.target.value = null;
    setFormData((prev) => ({
     ...prev,
     picture: null, // Clear the picture state
    }));
   } else {
    setFormData((prev) => ({
     ...prev,
     picture: file, // Update the state with the selected file
    }));
   }
  }
 };

 const handleRegister = async (e) => {
  e.preventDefault();

  // Prepare form data
  const data = new FormData();
  data.append('userName', formData.userName);
  data.append('gmail', formData.gmail);
  data.append('password', formData.password);
  data.append('age', formData.age);
  data.append('role', formData.role);
  if (formData.picture) {
   data.append('picture', formData.picture); // Add picture to form data if available
  }

  try {
   // Register the user
   const response = await axios.post(`${apiUrl}/api/users/register`, data, {
    headers: {
     'Content-Type': 'multipart/form-data',
    },
   });

   // Extract token and id from response
   const { token, id } = response.data.data;

   // Set cookies
   document.cookie = `userId=${id}; path=/; max-age=${60 * 60 * 24 * 7}`;
   document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;

   toast.success('Registration successful and logged in!');
   navigate('/profile'); // Redirect to profile after successful login

  } catch (error) {
   const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
   toast.error(errorMessage);
  }
 };

 return (
  <div className="registerContainer">
   <Toaster />
   <h2>Register</h2>
   <form className="registerForm" onSubmit={handleRegister}>
    <input
     type="text"
     placeholder="User Name"
     name="userName"
     value={formData.userName}
     onChange={handleInputChange}
     required
    />
    <input
     type="email"
     placeholder="Gmail"
     name="gmail"
     value={formData.gmail}
     onChange={handleInputChange}
     required
    />
    <input
     type="password"
     placeholder="Password"
     name="password"
     value={formData.password}
     onChange={handleInputChange}
     required
    />
    <input
     type="number"
     placeholder="Age"
     name="age"
     value={formData.age}
     onChange={handleInputChange}
     required
    />
    <select
     name="role"
     value={formData.role}
     onChange={handleInputChange}
     required
    >
     <option value="USER">User</option>
     <option value="MANAGER">Manager</option>
     <option value="ADMIN">Admin</option>
    </select>
    <input
     type="file"
     name="picture"
     accept="image/*"
     onChange={handleFileChange}
    />
    <button type="submit">Register</button>
   </form>
  </div>
 );
};

export default Register;
