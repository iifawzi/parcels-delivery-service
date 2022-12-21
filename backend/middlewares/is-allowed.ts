import { RequestWithRequester, RequesterInfo } from "@/interfaces";
import { BaseError } from "@/providers";
import { NextFunction, Response } from "express";

const isAllowed = (allowedFor: string[]) => {
    return (req: RequestWithRequester, res: Response, next: NextFunction) => {
        try {
            const requesterInfo = req.requester as RequesterInfo;
            if (allowedFor.includes(requesterInfo.role)) {
                next();
            } else {
                throw new BaseError(403, "You're not authorized to preform this action");
            }
        } catch (err: any) {
            err.statusCode = 403;
            next(err);
        }
    };
};

export default isAllowed;