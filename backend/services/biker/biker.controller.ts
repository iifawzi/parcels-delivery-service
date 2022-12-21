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
            this.logger.info(`BikerController :: login :: ${JSON.stringify(req.body.username)}`);
            const [status, loginInfo] = await this.bikerService.login(req.body.username, req.body.password);
            if (!status) {
                throw new BaseError(401, "You're not authenticated");
            }
            return ResponseUtility.Success(200, loginInfo, res);
        } catch (err: any) {
            next(err);
        }
    }
}