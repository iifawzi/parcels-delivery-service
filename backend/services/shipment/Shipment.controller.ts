import { inject, injectable } from "tsyringe";
import ShipmentService from "./Shipment.service";
import { BaseLogger } from "@/interfaces";

@injectable()
export default class ShipmentController {
    constructor(@inject("logger") private logger: BaseLogger, @inject("shipmentService") private shipmentService: ShipmentService) {
        this.logger = logger;
        this.shipmentService = shipmentService;
    }
}