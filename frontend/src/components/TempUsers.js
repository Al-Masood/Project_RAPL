import { useEffect, useState } from "react"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const TempUsers = () => {
    const [tempUsers, setTempUsers] = useState([])

    const fetchTempUsers = async () => {
        const response = await fetch(`${BACKEND_URL}/gettempusers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const fetchedUsers = await response.json()
        setTempUsers(fetchedUsers)
    }

    useEffect(() => {
        fetchTempUsers()
    }, [])

    const addUser = async (email) => {
        await fetch(`${BACKEND_URL}/adduser`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const removeUser = async (email) => {
        await fetch(`${BACKEND_URL}/removeuser`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className="list">
            <h3> User Approval </h3>
            {tempUsers.map(user => (
                <div className="item">
                    <div className="details-group">
                        <label>Name:</label>
                        <span>{user.name}</span>
                    </div>

                    <div className="details-group">
                        <label>Email:</label>
                        <span>{user.email}</span>
                    </div>

                    <div className="details-group">
                        <label>Roll:</label>
                        <span>{user.roll}</span>
                    </div>

                    <div className="details-group">
                        <label>Codeforces Handle:</label>
                        <span>{user.cfHandle}</span>
                    </div>

                    <div className="details-group">
                        <label>Vjudge Handle:</label>
                        <span>{user.vjHandle}</span>
                    </div>

                    <div className="details-group">
                        <label>CodeChef Handle:</label>
                        <span>{user.ccHandle}</span>
                    </div>

                    <div className="details-group">
                        <label>Atcoder Handle:</label>
                        <span>{user.atcoderHandle}</span>
                    </div>

                    <div className="button-group">
                        <button className="button" onClick={() => addUser(user.email)}>
                            Add User
                        </button>
                        <button className="button" onClick={() => removeUser(user.email)}>
                            Remove User
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TempUsers