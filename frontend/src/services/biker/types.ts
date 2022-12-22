export interface LoginBody {
    email: string,
    password: string,
}

export interface LoginResponse {
    data: {
        accessToken: string,
        userId: string
        fullName: string
        email: string
        isVerified: boolean,
    }
}
