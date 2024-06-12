import React from 'react';
import '@/styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer border-spacing-1">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Gauresh. All rights reserved.</p>
                <nav className="footer-nav">
                    <a href="https://github.com/gaureshpai" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub&raquo;</a>
                    <a href="https://www.linkedin.com/in/gaureshpai" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn&raquo;</a>
                    <a href="https://twitter.com/hseruag" className="footer-link" target="_blank" rel="noopener noreferrer">Twitter&raquo;</a>
                    <a href="https://gauresh.vercel.app" className="footer-link" target="_blank" rel="noopener noreferrer">Website&raquo;</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
