import { BaseError } from "@/providers";
import * as jwt from "jsonwebtoken";

export const createToken = (payload: Record<string, any>) => {
    try {
        const token = jwt.sign(payload, process.env.JWTSecret as string);
        return token;
    } catch (err) {
        throw new BaseError(401, 'Error while creating the token');
    }
};

export const checkToken = (token: string) => {
    try {
        const checkingResult = jwt.verify(token, process.env.JWTSecret as string);
        return checkingResult;
    } catch (err) {
        throw new BaseError(401, 'Invalid token', err);
    }
};

export const decodeToken = (token: string) => {
    try {
        const data = jwt.decode(token);
        return data;
    } catch (err) {
        throw new BaseError(401, 'Invalid token', err);
    }
};