import {useState} from 'react'
import { useAuthContext } from './UseAuthContext'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        if(response.ok){
            const data = await response.json()
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({ type: 'LOGIN', payload: data })
        }
        else{
            setIsLoading(false)
            const errorText = await response.text()
            setError(errorText)
        }
    }

    return { login, isLoading, error}
}