import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useLogout } from "../hooks/UseLogout"
import { useAuthContext } from "../hooks/UseAuthContext"
import '../css/Navbar.css'
import logo from '../data/photos/rapl_logo_brand.jpg'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleClick = () => {
        logout()
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const links = [
        { to: "/cfrating", label: "CF Rating" },
        { to: "/cfactivity", label: "CF Activity" },
        { to: "/cfstandings", label: "CF Standings" },
        { to: "/cfperformance", label: "CF Performance" },
        { to: "/tfcranklist", label: "TFC Ranklist" },
        { to: "/sessionplan", label: "Session Plan" },
        { to: "/achievements", label: "Achievements" }
    ]

    return (
        <header>
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} alt="RAPL Logo" />
                </Link>
            </div>

            <nav className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
                {links.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={location.pathname === link.to ? "active" : ""}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                {user && user.admin === true && (
                    <Link
                        to="/admin"
                        className={location.pathname === "/admin" ? "active" : ""}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Admin
                    </Link>
                )}
                <div className="navbar-user">
                    {user ? (
                        <>
                            <Link to='/profile' onClick={() => setIsMobileMenuOpen(false)}>
                                {user.name}
                            </Link>
                            <Link to="/" onClick={handleClick}>
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                &#9776
            </button>
        </header>
    )
}

export default Navbar
