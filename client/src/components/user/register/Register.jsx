import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import imageCompression from 'browser-image-compression'; // Import the compression library
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

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Compress the image if it exceeds 1MB
                const options = {
                    maxSizeMB: 1, // Maximum file size in MB
                    maxWidthOrHeight: 1920, // Optional: to maintain the aspect ratio of the image
                    useWebWorker: true,
                };

                let compressedFile = file;

                // Check if the file size exceeds 1MB
                if (file.size / 1024 / 1024 > 1) {
                    compressedFile = await imageCompression(file, options);
                    toast.info('Image has been compressed to fit under 1MB.');
                }

                setFormData((prev) => ({
                    ...prev,
                    picture: compressedFile, // Update the state with the compressed file
                }));
            } catch (error) {
                console.error('Error compressing the image:', error);
                toast.error('Failed to compress the image. Please try again.');
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
            const response = await axios.post(`${apiUrl}/api/users/register`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Registration successful! Please log in.');
            setFormData({
                userName: '',
                gmail: '',
                password: '',
                age: '',
                role: 'USER',
                picture: null,
            });
            navigate('/login'); // Redirect to login after successful registration
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
                    {/* Add more roles as needed */}
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
