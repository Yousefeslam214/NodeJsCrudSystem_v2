import React from 'react';
import LoadingSpinner from '../../global/loadingSpinner/LoadingSpinner';
import './profile.css';

const ProfilePicture = ({ picture, onError, onLoad }) => {
    return (
        <>
            {picture ? (
                <img
                    src={picture}
                    alt="Profile"
                    className="profilePicture"
                    loading="lazy"
                    onError={onError}
                    onLoad={onLoad}
                />
            ) : (

                <img src='../../../../public/avatar.webp'
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: '#1976d2e6', // Display white background
                        // border: '1px solid #ccc' // Optional: Add border for visibility
                        margin: 'auto',
                        // borderRadius: 50%,
                        objectFit: 'cover',
                        marginBottom: '10px'
                    }}
                />
                // <LoadingSpinner />
            )}
        </>
    );
};

export default ProfilePicture;
