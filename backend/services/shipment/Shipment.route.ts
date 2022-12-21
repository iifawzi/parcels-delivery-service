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
        this.router.patch('/match', isAuth, isAllowed(['biker']), validateSchema(ShipmentSchemas.matchShipmentSchema), this.shipmentController.matchShipment.bind(this.shipmentController));
        this.router.patch('/pickup', isAuth, isAllowed(['biker']), validateSchema(ShipmentSchemas.pickupShipmentSchema), this.shipmentController.pickupShipment.bind(this.shipmentController));
        this.router.patch('/deliver', isAuth, isAllowed(['biker']), validateSchema(ShipmentSchemas.deliverShipmentSchema), this.shipmentController.deliverShipment.bind(this.shipmentController));
        this.router.get('/waiting', isAuth, isAllowed(['biker']), this.shipmentController.getWaitingShipments.bind(this.shipmentController));
        this.router.get('/bikerShipments', isAuth, isAllowed(['biker']), this.shipmentController.getBikerShipments.bind(this.shipmentController));
        this.router.get('/customerShipments', isAuth, isAllowed(['customer']), this.shipmentController.getCustomerShipments.bind(this.shipmentController));
    }

    public get getRoutes(): express.Router {
        return this.router
    }

    public get getPrefix(): string {
        return this.prefix;
    }
}

export default ShipmentRouter;