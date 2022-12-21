import { NextFunction, Request, Response } from "express";
import { BaseError } from "@/providers";
import Joi from "joi";

const validateSchema = (schema: Joi.Schema, property: 'body' | 'query' = 'body', abortEarly = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property], {
            abortEarly,
        });
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const errors = details.map((detail) => detail.message);
            const err = new BaseError(400, 'Validation error', errors);
            next(err);
        }
    };
};

export default validateSchema;
