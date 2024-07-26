import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import logo from '../data/photos/rapl-logo.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>RUET Analytical Programming Lab</h4>
                    <div className="footer-brand">
                        <Link to="/">
                            <img src={logo} alt="RAPL Logo" />
                        </Link>
                    </div>
                </div>
                <div className="footer-section links">
                    <Link to="/cfrating">CF Rating</Link>
                    <Link to="/cfactivity">CF Activity</Link>
                    <Link to="/cfstandings">CF Standings</Link>
                    <Link to="/cfperformance">CF Performance</Link>
                    <Link to="/tfcranklist">TFC Ranklist</Link>
                    <Link to="/sessionplan">Session Plan</Link>
                    <Link to="/achievements">Achievements</Link>
                </div>
                <div className="footer-section contact">
                    <h5>Contact Us</h5>
                    <p>
                        <FontAwesomeIcon icon={faPhone} /> 
                        <a href="tel:+8801705287639"> 01705-287639</a>
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faEnvelope} /> 
                        <a href="mailto:rapl.ruet1964@gmail.com"> rapl.ruet1964@gmail.com</a>
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faFacebook} /> 
                        <a href="https://www.facebook.com/profile.php?id=61555704353446" target="_blank" rel="noopener noreferrer"> Facebook </a>
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} RUET Analytical Programming Lab. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
