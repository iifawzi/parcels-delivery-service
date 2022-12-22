import { AuthContext, InitialAuthState } from "contexts"
import React from "react"
import authReducer from "./authReducer"

interface ProviderProps {
    children: React.ReactNode
}

export default function AuthContextProvider({ children }: ProviderProps) {
    const [state, dispatch] = React.useReducer(authReducer, InitialAuthState)
    return (
        <>
            <AuthContext.Provider value={{ state, dispatch }} >
                {children}
            </AuthContext.Provider>
        </>
    );
}