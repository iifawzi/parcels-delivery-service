import { Response } from "express";

export class ResponseUtility {
    private static respondWith = (status: boolean, message: string, statusCode: number, data: any, res: Response) => {
        res.status(statusCode).json({
            status,
            message,
            data,
        });
    };

    public static Success(statusCode: number, data: any, res: Response) {
        this.respondWith(true, 'success', statusCode, data, res)
    }

    public static Failure(statusCode: number, message: string, errors: any, res: Response) {
        this.respondWith(false, message, statusCode, errors, res)
    }
}