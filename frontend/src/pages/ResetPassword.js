import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            const response = await fetch(`${BACKEND_URL}/resetpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword, confirmPassword })
            })

            if (response.ok) {
                setSuccess('Password has been reset successfully')
                setTimeout(() => navigate('/login'), 2000)
            } else {
                const errorText = await response.text()
                setError(errorText)
            }
        } catch (error) {
            setError('Server Error')
        }
    }

    return (
        <form className="listing" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <div className='details-group'>
                <label htmlFor="newPassword">New Password:</label>
                <input
                    className='input-field'
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div className='details-group'>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    className='input-field'
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div className='button-group'>
                <button type="submit" className="button">Reset Password</button>
            </div>
            {success && <div className='success'>{success}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default ResetPassword
