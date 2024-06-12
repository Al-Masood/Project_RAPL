import {createContext, useReducer} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return  {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

console.log('AuthContext state: ', state)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('AuthContext state: state: ', state)

    return (
        <AuthContext.Provider value = {{...state, state}}>
            {children}
        </AuthContext.Provider>
    )
}

