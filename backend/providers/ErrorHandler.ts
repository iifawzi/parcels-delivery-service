import { NextFunction } from "connect";
import { Response } from "express";

export class BaseError extends Error {
    constructor(public statusCode: number, public message: string, public errors?: any) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export const handleError = (err: BaseError, res: Response, next: NextFunction) => {
    const { message, statusCode = 500, errors = {} } = err;
    res.status(statusCode).json({
        status: false,
        message,
        errors
    });
};