import { container, inject, injectable, singleton } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import BikerService from "./biker.service";
import { BaseLogger } from "@/interfaces";
import { ResponseUtility } from "@/utils/Response";
import { BaseError } from "@/providers";
import { comparePassword } from "@/helpers";
import { createToken } from "@/helpers/jwt";

@injectable()
export default class BikerController {
    constructor(@inject("logger") private logger: BaseLogger, @inject("bikerService") private bikerService: BikerService) {
        this.logger = logger;
        this.bikerService = bikerService;
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            this.logger.info(`BikerService :: login :: ${JSON.stringify(req.body.username)}`);
            const user = await this.bikerService.findBiker(req.body.username);
            if (!user) {
                this.logger.error(`BikerService :: login :: 401 :: ${JSON.stringify(req.body.username)}`);
                throw new BaseError(401, " You're not authenticated");
            }
            const passwordIsSame = await comparePassword(req.body.password, user.password);
            if (!passwordIsSame) {
                this.logger.error(`BikerService :: login :: invalid password ::`);
                throw new BaseError(401, 'You\'re not authorized');
            }
            delete user.password;
            const token = createToken({ ...user, role: 'biker' });
            return ResponseUtility.Success(200, { ...user, token }, res);
        } catch (err: any) {
            next(err);
        }
    }
}