import { Link } from "react-router-dom";
import { useLogout } from "../hooks/UseLogout";
import { useAuthContext } from "../hooks/UseAuthContext";

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleClick = () => {
        logout()
    }
    return(
        <header>
            <div className="container">
                <Link to ="/">
                    <h1>Homepage</h1>
                </Link>

                <Link to ="/cfperformance">
                    <h1>Codeforces Performance</h1>
                </Link>
                
                <Link to ="/vjudgeranklist">
                    <h1>Vjudge Ranklist</h1>
                </Link>

                <Link to ="/adminpanel">
                    <h1>Admin Panel</h1>
                </Link>

                {user && (
                    <div>
                        <span>{user.name}</span>
                        <button className = 'button' onClick={handleClick}> Logout</button>
                    </div>
                )}

                {!user && (
                    <div>
                        <Link to ="/login">
                            <h1>Login</h1>
                        </Link>

                        <Link to ="/signup">
                            <h1>Sign Up</h1>
                        </Link>
                    </div>
                )}



            </div>
        </header>
    )
}

export default Navbar