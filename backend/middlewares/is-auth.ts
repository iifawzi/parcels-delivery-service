import { checkToken } from "@/helpers";
import { RequestWithRequester, RequesterInfo } from "@/interfaces";
import { BaseError } from "@/providers";
import { NextFunction, Response } from "express";

const isAuth = (req: RequestWithRequester, res: Response, next: NextFunction) => {
    try {
        const encoded_token = req.headers.authorization;
        if (!encoded_token) {
            throw new BaseError(401, "You\'re not authenticated");
        } else {
            let splicedToken;
            const spliced = encoded_token.split(" ");
            splicedToken = spliced[1];

            let decoded_token = checkToken(splicedToken) as RequesterInfo;
            if (decoded_token) {
                req.requester = {
                    ...decoded_token,
                };
            }
            return next();
        }
    } catch (err: any) {
        err.statusCode = 401;
        next(err);
    }
};

export default isAuth;