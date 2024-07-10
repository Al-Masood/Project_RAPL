import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await fetch('http://localhost:4000/api/requestpasswordreset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setMessage('Recovery email sent');
            } else {
                const errorText = await response.text();
                setError(errorText);
            }
        } catch (error) {
            setError('Server Error');
        }
    };

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
            {message && <div className='message'>{message}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default ForgotPassword;
