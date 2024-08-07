import { useState } from 'react'
import { useAuthContext } from "../hooks/UseAuthContext"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const UserProfile = () => {
    const { user } = useAuthContext()
    const [editMode, setEditMode] = useState(false)

    const [change, setChange] = useState({
        name: user.name,
        email: user.email,
        roll: user.roll,
        cfHandle: user.cfHandle,
        vjHandle: user.vjHandle,
        ccHandle: user.ccHandle,
        atcoderHandle: user.atcoderHandle
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log({name, value})
        setChange({
            ...change,
            [name]: value
        })
    }

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleCancelEdit = () => {
        setChange({
            name: user.name,
            email: user.email,
            roll: user.roll,
            cfHandle: user.cfHandle,
            vjHandle: user.vjHandle,
            ccHandle: user.ccHandle,
            atcoderHandle: user.atcoderHandle
        })
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
        setChange({
            name: user.name,
            email: user.email,
            roll: user.roll,
            cfHandle: user.cfHandle,
            vjHandle: user.vjHandle,
            ccHandle: user.ccHandle,
            atcoderHandle: user.atcoderHandle
        })
        setEditMode(false)
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
                            placeholder={user.name}
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
                            placeholder={user.email}
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
                            placeholder={user.roll}
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
                            placeholder={user.cfHandle}
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
                            placeholder={user.vjHandle}
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
                            placeholder={user.ccHandle}
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
                            placeholder={user.atcoderHandle}
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
                        <button onClick={handleEdit} className='button'>Edit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfile