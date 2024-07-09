import { useState } from "react";
import { useAuthContext } from "../hooks/UseAuthContext";

const PasswordChange = () => {
    const { user } = useAuthContext()
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:4000/api/changepassword', {
            method: 'POST',
            body: JSON.stringify({
                email: user.user.email,
                oldPassword,
                newPassword,
                confirmPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responseData = await response.text()
        if (response.ok) {
            setSuccess(responseData)
            setError(null)
        } else {
            setSuccess(null)
            setError(responseData)
        }
    }

    return (
        <div className="listing">
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <div className="details-group">
                <label>Old Password:</label>
                <input
                    className='input-field'
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="details-group">
                <label>New Password:</label>
                <input
                    className='input-field'
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="details-group">
                <label>Confirm Password:</label>
                <input
                    className='input-field'
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="button-group">
                <button className='button' onClick={handleSubmit} >
                    Change Password
                </button>
            </div>
        </div>
    )
}

export default PasswordChange

