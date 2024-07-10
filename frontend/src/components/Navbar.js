import { Link } from "react-router-dom";
import { useLogout } from "../hooks/UseLogout";
import { useAuthContext } from "../hooks/UseAuthContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="navbar-brand">
                <Link to="/">
                    RAPL
                </Link>
            </div>

            <div className="navbar-links">
                <Link to="/cfrating">
                    CF Rating
                </Link>

                <Link to="/cfactivity">
                    CF Activity
                </Link>

                <Link to="/cfperformance">
                    CF Performance
                </Link>

                <Link to="/cfstandings">
                    CF Standings
                </Link>

                <Link to="/vjudgeranklist">
                    TFC Ranklist
                </Link>

                <Link to="/resources">
                    Resources
                </Link>

                <Link to="/halloffame">
                    Hall of Fame
                </Link>


                {user && user.admin === true && (
                    <Link to="/adminpanel">
                        Admin Panel
                    </Link>
                    )
                }
            </div>

            {user && (
                <div className="navbar-user">
                    <Link to='/profile'>
                        {user.name}
                    </Link>
                    
                    <Link onClick={handleClick}> 
                        Logout
                    </Link>
                </div>
            )}

            {!user && (
                <div className="navbar-user">
                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/signup">
                        Sign Up
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Navbar