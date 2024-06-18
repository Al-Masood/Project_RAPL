import { useState, useEffect } from "react"

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [roll, setRoll] = useState('')
    const [cfHandle, setCFHandle] = useState('')
    const [vjHandle, setVJHandle] = useState('')
    const [ccHandle, setCCHandle] = useState('')
    const [atcoderHandle, setAtcoderHandle] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (success) {
            setName('')
            setEmail('')
            setRoll('')
            setCFHandle('')
            setVJHandle('')
            setCCHandle('')
            setAtcoderHandle('')
            setPassword('')
        }
    }, [success])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        const user = {
            name,
            email,
            roll,
            cfHandle,
            vjHandle,
            ccHandle,
            atcoderHandle,
            password
        }

        const response = await fetch('http://localhost:4000/api/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responseData = await response.text()
        if (response.ok) {
            setSuccess(responseData)
        } else {
            setError(responseData)
        }
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <label> Name: </label>
            <input
                className='input-field'
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label> Email: </label>
            <input
                className='input-field'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label> Roll: </label>
            <input
                className='input-field'
                type='text'
                onChange={(e) => setRoll(e.target.value)}
                value={roll}
            />
            <label> Codeforces Handle: </label>
            <input
                className='input-field'
                type='text'
                onChange={(e) => setCFHandle(e.target.value)}
                value={cfHandle}
            />
            <label> VJudge Handle: </label>
            <input
                className='input-field'
                type='text'
                onChange={(e) => setVJHandle(e.target.value)}
                value={vjHandle}
            />
            <label> CodeChef Handle: </label>
            <input
                className='input-field'
                type='text'
                onChange={(e) => setCCHandle(e.target.value)}
                value={ccHandle}
            />
            <label> Atcoder Handle: </label>
            <input
                className='input-field'
                type='text'
                onChange={(e) => setAtcoderHandle(e.target.value)}
                value={atcoderHandle}
            />
            <label> Password: </label>
            <input
                className='input-field'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button className="button">Sign Up</button>
        </form>
    )
}

export default SignUp
