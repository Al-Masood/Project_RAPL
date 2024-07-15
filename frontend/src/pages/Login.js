import { useState } from 'react';
import { useLogin } from '../hooks/UseLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    const handleForgotPassword = () => {
        navigate('/forgotpassword');
    };

    return (
        <form className="listing" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className='details-group'>
                <label>Email:</label>
                <input
                    className='input-field'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className='details-group'>
                <label>Password:</label>
                <input
                    className='input-field'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className='button-group'>
                {isLoading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <button disabled={isLoading} className="button">Login</button>
                   
                )}
                {isLoading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <button className="button" onClick={handleForgotPassword}>Forgot Password</button>
                )}
                 
                
            </div>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default Login;
