export interface UserInfoI {
    fullName: string,
    username: string,
    role: string
}

export interface AuthStateI {
    user: UserInfoI | {},
    isAuth: boolean
}

export enum ActionType {
    ChangeUserInfo = 'ChangeUserInfo'
}

export interface AuthReducerAction {
    type: ActionType.ChangeUserInfo;
    payload: AuthStateI;
}
