import { inject, injectable } from "tsyringe";
import ShipmentService from "./Shipment.service";
import { BaseLogger, RequestWithRequester } from "@/interfaces";
import { NextFunction, Response } from "express";
import { CreateShipmentInfo } from "./interfaces";
import { ResponseUtility } from "@/utils/Response";
import { ShipmentStatus } from "./repository/mongodb/shipment.model";

@injectable()
export default class ShipmentController {
    constructor(@inject("logger") private logger: BaseLogger, @inject("shipmentService") private shipmentService: ShipmentService) {
        this.logger = logger;
        this.shipmentService = shipmentService;
    }

    public async createShipment(req: RequestWithRequester, res: Response, next: NextFunction) {
        try {
            this.logger.info(`ShipmentController :: createShipment :: ${JSON.stringify(req.body)}`);
            const shimpentInfo = {...req.body, customerId: req.requester?._id, shipmentStatus: ShipmentStatus.WAITING } as unknown as CreateShipmentInfo;
            const [_, shipmentData] = await this.shipmentService.addShipment(shimpentInfo);
            return ResponseUtility.Success(201, shipmentData, res);
        } catch (err: any) {
            next(err);
        }
    }
}