import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;



const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
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
