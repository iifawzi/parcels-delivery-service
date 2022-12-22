import React from "react";
import { useContext, createContext } from "react";
import { contextTypes } from "types/auth";

export const InitialAuthState: contextTypes.AuthStateI = {
    isAuth: false,
    user: {}
}

export const AuthContext = createContext<{ state: contextTypes.AuthStateI, dispatch: React.Dispatch<contextTypes.AuthReducerAction> }>(
    {
        state: InitialAuthState,
        dispatch: () => undefined,
    }
);
export function useAuth() {
    return useContext(AuthContext);
}

