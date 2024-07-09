import { useEffect, useState } from "react";

const TempUsers = () => {
    const [tempUsers, setTempUsers] = useState([]);

    const fetchTempUsers = async () => {
        const response = await fetch('http://localhost:4000/api/gettempusers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const fetchedUsers = await response.json();
        setTempUsers(fetchedUsers);
    };

    useEffect(() => {
        fetchTempUsers();
    }, []);

    const addUser = async (email) => {
        await fetch('http://localhost:4000/api/adduser', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    const removeUser = async (email) => {
        await fetch('http://localhost:4000/api/removeuser', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    return (
        <div className="listing">
            <ul className="user-list">
                {tempUsers.map(user => (
                    <li key={user._id} className="details-group">
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Roll: {user.roll}</p>
                        <p>Codeforces Handle: {user.cfHandle}</p>
                        <p>VJudge Handle: {user.vjHandle}</p>
                        <div className="button-group">
                            <button className="button" onClick={() => addUser(user.email)}>
                                Add User
                            </button>
                            <button className="button" onClick={() => removeUser(user.email)}>
                                Remove User
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TempUsers;
