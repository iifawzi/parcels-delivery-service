import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import CustomerService from "./Customer.service";
import { BaseLogger } from "@/interfaces";
import { ResponseUtility } from "@/utils/Response";
import { BaseError } from "@/providers";
import { comparePassword } from "@/helpers";
import { createToken } from "@/helpers/jwt";

@injectable()
export default class CustomerController {
    constructor(@inject("logger") private logger: BaseLogger, @inject("customerService") private customerService: CustomerService) {
        this.logger = logger;
        this.customerService = customerService;
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            this.logger.info(`BikerService :: login :: ${JSON.stringify(req.body.username)}`);
            const [status, loginInfo] = await this.customerService.login(req.body.username, req.body.password);
            if (!status) {
                throw new BaseError(401, "You're not authenticated");
            }
            return ResponseUtility.Success(200, loginInfo, res);
        } catch (err: any) {
            next(err);
        }
    }
}