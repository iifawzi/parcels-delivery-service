import { validateSchema } from "@/middlewares";
import express from "express"
import { container } from "tsyringe";
import * as ShipmentSchemas from "./shipment.validation"
import ShipmentController from "./Shipment.controller";

class ShipmentRouter {
    private prefix: string = '/shipment';
    private router: express.Router = express.Router();
    private shipmentController = container.resolve<ShipmentController>('shipmentController');

    constructor() {
        this.configureRoutes();
    }

    private configureRoutes() {
    }

    public get getRoutes(): express.Router {
        return this.router
    }

    public get getPrefix(): string {
        return this.prefix;
    }
}

export default ShipmentRouter;