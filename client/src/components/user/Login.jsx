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
            const response = await axios.post(
                `${apiUrl}/api/users/login`,
                { gmail, password },
                { withCredentials: true }  // Include this line
            );
            const { token } = response.data.data;
            const { id } = response.data.data;
            // console.log(response.data)
            document.cookie = `userId=${id}; path=/; max-age=${60 * 60 * 24 * 7}`; // Cookie expires in 7 days
            document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // Cookie expires in 7 days
            // document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // Cookie expires in 7 days

            // You can remove the line below if you don't need to store the token in localStorage
            // localStorage.setItem('token', token);

            toast.success('Login successful!');
            navigate('/profile');
        } catch (error) {
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
