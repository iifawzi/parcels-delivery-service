import { validateSchema } from "@/middlewares";
import express from "express"
import * as BikerSchemas from "./biker.validation"
import { container } from "tsyringe";
import BikerController from "./biker.controller";

class BikerRouter {
    private prefix: string = '/biker';
    private router: express.Router = express.Router();
    private bikerController = container.resolve<BikerController>('bikerController');

    constructor() {
        this.configureRoutes();
    }

    private configureRoutes() {
        this.router.post("/login", validateSchema(BikerSchemas.signinSchema), this.bikerController.login.bind(this.bikerController));
    }

    public get getRoutes(): express.Router {
        return this.router
    }

    public get getPrefix(): string {
        return this.prefix;
    }
}

export default BikerRouter;