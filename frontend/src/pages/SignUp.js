import { useState, useEffect } from "react"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [roll, setRoll] = useState('')
    const [cfHandle, setCFHandle] = useState('')
    const [vjHandle, setVJHandle] = useState('')
    const [ccHandle, setCCHandle] = useState('')
    const [atcoderHandle, setAtcoderHandle] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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
            setConfirmPassword('')
        }
    }, [success])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setIsLoading(true)

        const user = {
            name,
            email,
            roll,
            cfHandle,
            vjHandle,
            ccHandle,
            atcoderHandle,
            password,
            confirmPassword
        }

        try {
            const response = await fetch(`${BACKEND_URL}/signup`, {
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
        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="listing" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="details-group">
                <label>Name *</label>
                <input
                    className='input-field'
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
            </div>
            <div className="details-group">
                <label>Email *</label>
                <input
                    className='input-field'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </div>
            <div className="details-group">
                <label>Roll *</label>
                <input
                    className='input-field'
                    type='text'
                    onChange={(e) => setRoll(e.target.value)}
                    value={roll}
                    required
                />
            </div>
            <div className="details-group">
                <label>Codeforces Handle *</label>
                <input
                    className='input-field'
                    type='text'
                    onChange={(e) => setCFHandle(e.target.value)}
                    value={cfHandle}
                    required
                />
            </div>
            <div className="details-group">
                <label>VJudge Handle *</label>
                <input
                    className='input-field'
                    type='text'
                    onChange={(e) => setVJHandle(e.target.value)}
                    value={vjHandle}
                    required
                />
            </div>
            <div className="details-group">
                <label>CodeChef Handle</label>
                <input
                    className='input-field'
                    type='text'
                    onChange={(e) => setCCHandle(e.target.value)}
                    value={ccHandle}
                />
            </div>
            <div className="details-group">
                <label>Atcoder Handle</label>
                <input
                    className='input-field'
                    type='text'
                    onChange={(e) => setAtcoderHandle(e.target.value)}
                    value={atcoderHandle}
                />
            </div>
            <div className="details-group">
                <label>Password *</label>
                <input
                    className='input-field'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </div>
            <div className="details-group">
                <label>Confirm Password *</label>
                <input
                    className='input-field'
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                />
            </div>
            <div className="button-group">
                {isLoading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <button className="button">Sign Up</button>
                )}
            </div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </form>
    )
}

export default SignUp