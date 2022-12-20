import { validateSchema } from "@/middlewares";
import express from "express"
import * as CustomerSchemas from "./customer.validation"
import { container } from "tsyringe";
import CustomerController from "./Customer.controller";

class CustomerRouter {
    private prefix: string = '/customer';
    private router: express.Router = express.Router();
    private customerController = container.resolve<CustomerController>('customerController');

    constructor() {
        this.configureRoutes();
    }

    private configureRoutes() {
        this.router.post("/login", validateSchema(CustomerSchemas.signinSchema), this.customerController.login.bind(this.customerController));
    }

    public get getRoutes(): express.Router {
        return this.router
    }

    public get getPrefix(): string {
        return this.prefix;
    }
}

export default CustomerRouter;