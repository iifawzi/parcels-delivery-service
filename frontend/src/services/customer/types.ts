export interface LoginBody {
    email: string,
    password: string,
}

export interface LoginResponse {
    data: {
        _id: string,
        username: string
        fullName: string
        token: string
    }
}
