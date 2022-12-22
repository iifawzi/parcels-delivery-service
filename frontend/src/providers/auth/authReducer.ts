import jwtDecode from "jwt-decode"
import { contextTypes } from "types/auth";

/****** Reducer *******/
export default function authReducer(state: contextTypes.AuthStateI, action: contextTypes.AuthReducerAction): contextTypes.AuthStateI {
    switch (action.type) {
        case contextTypes.ActionType.ChangeUserInfo:
            return { ...state, isAuth: action.payload.isAuth, user: action.payload.user };

        default:
            return state;
    }
}


/**
 ************************************************** 
 * Helpers 
 * // Helpers to make the dispatch calls simpler, you only need to call these function to update the state
 *************************************************** 
 */
export const ChangeUserInfo = (payload: contextTypes.AuthStateI): contextTypes.AuthReducerAction => {
    return {
        type: contextTypes.ActionType.ChangeUserInfo,
        payload: payload
    }
}

export const getInfoFromToken = (token: string): contextTypes.AuthStateI => {
    const payload = {
        isAuth: false,
        user: {},
    }
    const decodedToken: contextTypes.UserInfoI = jwtDecode(token);
    payload.user = { ...decodedToken }
    payload.isAuth = true
    return payload
}