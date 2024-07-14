import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/UseLogout";
import { useAuthContext } from "../hooks/UseAuthContext";
import '../css/Navbar.css';
import logo from '../data/photos/rapl-logo.png';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const location = useLocation();

    const handleClick = () => {
        logout();
    };

    const links = [
        { to: "/cfrating", label: "CF Rating" },
        { to: "/cfactivity", label: "CF Activity" },
        { to: "/cfperformance", label: "CF Performance" },
        { to: "/cfstandings", label: "CF Standings" },
        { to: "/vjudgeranklist", label: "TFC Ranklist" },
        { to: "/resources", label: "Resources" },
        { to: "/halloffame", label: "Hall of Fame" }
    ];

    return (
        <header>
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} alt="RAPL Logo" />
                </Link>
            </div>

            <nav className="navbar-links">
                {links.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={location.pathname === link.to ? "active" : ""}
                    >
                        {link.label}
                    </Link>
                ))}
                {user && user.admin === true && (
                    <Link
                        to="/adminpanel"
                        className={location.pathname === "/adminpanel" ? "active" : ""}
                    >
                        Admin Panel
                    </Link>
                )}
            </nav>

            <div className="navbar-user">
                {user ? (
                    <>
                        <Link to='/profile'>
                            {user.name}
                        </Link>
                        <Link to="/" onClick={handleClick}>
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>
                        <Link to="/signup">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
