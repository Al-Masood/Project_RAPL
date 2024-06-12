import { useState } from "react"

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [roll, setRoll] = useState('')
    const [cfHandle, setCFHandle] = useState('')
    const [vjHandle, setVJHandle] = useState('')
    const [ccHandle, setCCHandle] = useState('')
    const [atcoderHandle, setAtcoderHandle] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            name: name,
            email: email,
            roll: roll,
            cfHandle: cfHandle,
            vjHandle: vjHandle,
            ccHandle: ccHandle,
            atcoderHandle: atcoderHandle,
            password: password
        }

        await fetch('http://localhost:4000/api/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <form className="signup" onSubmit = {handleSubmit} >
            <h3>Sign Up</h3>
            <label> Name: </label> 
            <input
                className='input-field'
                type='name'
                onChange = {(e) => setName(e.target.value)}
                value = {name}
            />

            <label> Email: </label> 
            <input
                className='input-field'
                type='email'
                onChange = {(e) => setEmail(e.target.value)}
                value = {email}
            />

            <label> Roll: </label> 
            <input
                className='input-field'
                type='text'
                onChange = {(e) => setRoll(e.target.value)}
                value = {roll}
            />

            <label> Codeforces Handle: </label> 
            <input
                className='input-field'
                type='text'
                onChange = {(e) => setCFHandle(e.target.value)}
                value = {cfHandle}
            />

            <label> VJudge Handle: </label> 
            <input
                className='input-field'
                type='text'
                onChange = {(e) => setVJHandle(e.target.value)}
                value = {vjHandle}
            />

            <label> CodeChef Handle: </label> 
            <input
                className='input-field'
                type='text'
                onChange = {(e) => setCCHandle(e.target.value)}
                value = {ccHandle}
            />

            <label> Atcoder Handle: </label> 
            <input
                className='input-field'
                type='text'
                onChange = {(e) => setAtcoderHandle(e.target.value)}
                value = {atcoderHandle}
            />

            <label> Password: </label> 
            <input
                className='input-field'
                type='password'
                onChange = {(e) => setPassword(e.target.value)}
                value = {password}
            />

            <button className="button"> Sign Up </button>
        </form>
    )
}

export default SignUp