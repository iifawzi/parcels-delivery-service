import { NextFunction } from "connect";
import { Response } from "express";

export class BaseError extends Error {
    constructor(public statusCode: number, public message: string) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export const handleError = (err: BaseError, res: Response, next: NextFunction) => {
    const { message, statusCode = 500 } = err;
    res.status(statusCode).json({
        status: false,
        message,
        data: {}
    });
};