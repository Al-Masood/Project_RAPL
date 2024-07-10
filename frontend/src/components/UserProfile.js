import { useState } from 'react'
import { useAuthContext } from "../hooks/UseAuthContext";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const UserProfile = () => {
    const { user } = useAuthContext()
    const [editMode, setEditMode] = useState(false)

    const [change, setChange] = useState({
        name: user.user.name,
        email: user.user.email,
        roll: user.user.roll,
        cfHandle: user.user.cfHandle,
        vjHandle: user.user.vjHandle,
        ccHandle: user.user.ccHandle,
        atcoderHandle: user.user.atcoderHandle
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setChange({
            ...change,
            [name]: value
        })
    }

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleCancelEdit = () => {
        setEditMode(false)
    }

    const handleChangeRequest = async () => {
        await fetch(`${BACKEND_URL}/requestchange`, {
            method: 'POST',
            body: JSON.stringify(change),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className="listing">
            {editMode ? (
                <div>
                    <div className="details-group">
                        <label>Name:</label>
                        <input 
                            className='input-field'
                            type="text"
                            name="name"
                            value={change.name}
                            onChange={handleChange}
                            placeholder={user.user.name}
                        />
                    </div>
                    <div className="details-group">
                        <label>Email:</label>
                        <input 
                            className='input-field'
                            type="email"
                            name="email"
                            value={change.email}
                            onChange={handleChange}
                            placeholder={user.user.email}
                        />
                    </div>
                    <div className="details-group">
                        <label>Roll:</label>
                        <input 
                            className='input-field'
                            type="text"
                            name="roll"
                            value={change.roll}
                            onChange={handleChange}
                            placeholder={user.user.roll}
                        />
                    </div>
                    <div className="details-group">
                        <label>Codeforces Handle:</label>
                        <input 
                            className='input-field'
                            type="text"
                            name="cfHandle"
                            value={change.cfHandle}
                            onChange={handleChange}
                            placeholder={user.user.cfHandle}
                        />
                    </div>
                    <div className="details-group">
                        <label>Vjudge Handle:</label>
                        <input 
                            className='input-field'
                            type="text"
                            name="vjHandle"
                            value={change.vjHandle}
                            onChange={handleChange}
                            placeholder={user.user.vjHandle}
                        />
                    </div>
                    <div className="details-group">
                        <label>CodeChef Handle:</label>
                        <input 
                            className='input-field'
                            type="text"
                            name="ccHandle"
                            value={change.ccHandle}
                            onChange={handleChange}
                            placeholder={user.user.ccHandle}
                        />
                    </div>
                    <div className="details-group">
                        <label>Atcoder Handle:</label>
                        <input 
                            className='input-field'
                            type="text"
                            name="atcoderHandle"
                            value={change.atcoderHandle}
                            onChange={handleChange}
                            placeholder={user.user.atcoderHandle}
                        />
                    </div>
                    <div className="button-group">
                        <button className='button' onClick={handleChangeRequest}>Request Changes</button>
                        <button className='button' onClick={handleCancelEdit}>Cancel Edit</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="details-group">
                        <label>Name:</label>
                        <span>{user.user.name}</span>
                    </div>
                    <div className="details-group">
                        <label>Email:</label>
                        <span>{user.user.email}</span>
                    </div>
                    <div className="details-group">
                        <label>Roll:</label>
                        <span>{user.user.roll}</span>
                    </div>
                    <div className="details-group">
                        <label>Codeforces Handle:</label>
                        <span>{user.user.cfHandle}</span>
                    </div>
                    <div className="details-group">
                        <label>Vjudge Handle:</label>
                        <span>{user.user.vjHandle}</span>
                    </div>
                    <div className="details-group">
                        <label>CodeChef Handle:</label>
                        <span>{user.user.ccHandle}</span>
                    </div>
                    <div className="details-group">
                        <label>Atcoder Handle:</label>
                        <span>{user.user.atcoderHandle}</span>
                    </div>
                    <div className="button-group">
                        <button onClick={handleEdit} className='button'>Edit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfile
