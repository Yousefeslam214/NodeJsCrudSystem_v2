import React from 'react';
import './profile.css';

const ProfileDetails = ({ user }) => {
    return (
        <div className="profileDetails">
            <p><strong>Name:</strong> {user.userName}</p>
            <p><strong>Email:</strong> {user.gmail}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
};

export default ProfileDetails;
