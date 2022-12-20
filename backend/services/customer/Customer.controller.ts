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
            this.logger.info(`CustomerService :: login :: ${JSON.stringify(req.body.username)}`);
            const user = await this.customerService.findCustomer(req.body.username);
            if (!user) {
                this.logger.error(`CustomerService :: login :: 401 :: ${JSON.stringify(req.body.username)}`);
                throw new BaseError(401, " You're not authenticated");
            }
            const passwordIsSame = await comparePassword(req.body.password, user.password);
            if (!passwordIsSame) {
                this.logger.error(`CustomerService :: login :: invalid password ::`);
                throw new BaseError(401, 'You\'re not authorized');
            }
            delete user.password;
            const token = createToken({ ...user, role: 'customer' });
            return ResponseUtility.Success(200, { ...user, token }, res);
        } catch (err: any) {
            next(err);
        }
    }
}