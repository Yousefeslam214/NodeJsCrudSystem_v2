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
                <LoadingSpinner />
            )}
        </>
    );
};

export default ProfilePicture;
