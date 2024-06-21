import { useAuthContext } from './UseAuthContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    

    const logout = async () => {
        localStorage.removeItem('user')

        dispatch ({type: 'LOGOUT'})
    }

    return { logout }
}