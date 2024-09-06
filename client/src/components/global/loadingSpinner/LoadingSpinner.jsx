import React from 'react';
import './loadingSpinner.css'; // Create this CSS file for spinner styles

const LoadingSpinner = () => {
    return (
        <div className="loading">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingSpinner;
