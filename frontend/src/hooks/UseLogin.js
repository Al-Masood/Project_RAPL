import {useState} from 'react'
import { useAuthContext } from './UseAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const res = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(res)
        }
        else{
            localStorage.setItem('user', JSON.stringify(res))
            dispatch ({type: 'LOGIN', payload: res})
        }
    }

    return { login, isLoading, error}
}