import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/users/login`, { gmail, password }); // Replace with your API endpoint
            const { token } = response.data.data;
            console.log(token)
            localStorage.setItem('token', token);

            toast.success('Login successful!');
            navigate('/profile');
        } catch (error) {
            // Display error from server or a generic message
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div>
            <Toaster />
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="gmail"
                    placeholder="gmail"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
