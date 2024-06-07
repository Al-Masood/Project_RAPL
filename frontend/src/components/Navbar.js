import { Link } from "react-router-dom";

const Navbar = () => {
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
            </div>
        </header>
    )
}

export default Navbar