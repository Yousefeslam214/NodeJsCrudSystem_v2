import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        !isOnline && (
            <div style={styles.offlineBanner}>
                You are currently offline. Some features may not be available.
            </div>
        )
    );
};

const styles = {
    offlineBanner: {
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '10px',
        backgroundColor: '#ff4d4d',
        color: '#fff',
        textAlign: 'center',
        zIndex: 1000,
    },
};

export default NetworkStatus;
