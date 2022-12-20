import { container, inject, injectable, singleton } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import BikerService from "./Biker.service";
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
            const biker = await this.bikerService.findBiker(req.body.username);
            if (!biker) {
                this.logger.error(`BikerService :: login :: 401 :: ${JSON.stringify(req.body.username)}`);
                throw new BaseError(401, "You're not authenticated");
            }
            const passwordIsSame = await comparePassword(req.body.password, biker.password);
            if (!passwordIsSame) {
                this.logger.error(`BikerService :: login :: invalid password ::`);
                throw new BaseError(401, 'You\'re not authenticated');
            }
            delete biker.password;
            const token = createToken({ ...biker, role: 'biker' });
            return ResponseUtility.Success(200, { ...biker, token }, res);
        } catch (err: any) {
            next(err);
        }
    }
}