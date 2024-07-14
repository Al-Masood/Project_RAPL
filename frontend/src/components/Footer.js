import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>RUET Analytical Programming Lab</h4>
                </div>
                <div className="footer-section">
                    <Link to="/">Home</Link>
                    <Link to="/cfrating">CF Rating</Link>
                    <Link to="/cfactivity">CF Activity</Link>
                    <Link to="/cfperformance">CF Performance</Link>
                    <Link to="/cfstandings">CF Standings</Link>
                    <Link to="/tfcranklist">TFC Ranklist</Link>
                    <Link to="/resources">Resources</Link>
                    <Link to="/hallofhame">Hall of Fame</Link>
                    <Link to="/resources">Resources</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
