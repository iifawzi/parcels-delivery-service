import { isAllowed, isAuth, validateSchema } from "@/middlewares";
import express, { NextFunction, Request, Response } from "express"
import { container } from "tsyringe";
import * as ShipmentSchemas from "./shipment.validation"
import ShipmentController from "./Shipment.controller";
import { RequestWithRequester } from "@/interfaces";

class ShipmentRouter {
    private prefix: string = '/shipment';
    private router: express.Router = express.Router();
    private shipmentController = container.resolve<ShipmentController>('shipmentController');

    constructor() {
        this.configureRoutes();
    }

    private configureRoutes() {
        this.router.post('/', isAuth, isAllowed(['customer']), validateSchema(ShipmentSchemas.createShipmentSchema), this.shipmentController.createShipment.bind(this.shipmentController));
    }

    public get getRoutes(): express.Router {
        return this.router
    }

    public get getPrefix(): string {
        return this.prefix;
    }
}

export default ShipmentRouter;