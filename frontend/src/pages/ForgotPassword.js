import React, { useState } from 'react'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            const response = await fetch(`${BACKEND_URL}/requestpasswordreset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            if (response.ok) {
                setSuccess('Recovery email sent')
            } else {
                const errorText = await response.text()
                setError(errorText)
            }
        } catch (error) {
            setError('Server Error')
        }
    }

    return (
        <form className="listing" onSubmit={handleSubmit} >
            <h2>Forgot Password</h2>
            <div className='details-group'>
                <label> Email: </label>
                <input
                    className='input-field'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className='button-group'>
                <button type="submit" className="button"> Send Reset Link </button>
            </div>
            {success && <div className='success'>{success}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default ForgotPassword
