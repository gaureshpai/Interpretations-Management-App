import React from 'react';
import '@/styles/loadingscreen.css'

const LoadingScreen: React.FC = () => {
    return (
        <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading Interpretations...</p>
        </div>
    );
};

export default LoadingScreen;
