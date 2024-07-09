import { useState } from 'react'
import { useLogin } from '../hooks/UseLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <form className="listing" onSubmit={handleSubmit} >
            <h2>Login</h2>
            <div className='details-group'>
                <label> Email: </label>
                <input
                    className='input-field'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className='details-group'>
                <label> Password: </label>
                <input
                    className='input-field'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className='button-group'>
                <button disabled={isLoading} className="button"> Login </button>
            </div>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login