import { inject, injectable } from "tsyringe";
import ShipmentService from "./Shipment.service";
import { BaseLogger, RequestWithRequester } from "@/interfaces";
import { NextFunction, Response } from "express";
import { CreateShipmentInfo } from "./interfaces";
import { ResponseUtility } from "@/utils/Response";
import { ShipmentStatus } from "./repository/mongodb/shipment.model";
import { PickShipmentInfo } from "./interfaces/pickShipmentInfo";
import { BaseError } from "@/providers";

@injectable()
export default class ShipmentController {
    constructor(@inject("logger") private logger: BaseLogger, @inject("shipmentService") private shipmentService: ShipmentService) {
        this.logger = logger;
        this.shipmentService = shipmentService;
    }

    public async createShipment(req: RequestWithRequester, res: Response, next: NextFunction) {
        try {
            this.logger.info(`ShipmentController :: createShipment :: ${JSON.stringify(req.body)}`);
            const shimpentInfo = { ...req.body, customerId: req.requester?._id, shipmentStatus: ShipmentStatus.WAITING } as unknown as CreateShipmentInfo;
            const [_, shipmentData] = await this.shipmentService.addShipment(shimpentInfo);
            return ResponseUtility.Success(201, shipmentData, res);
        } catch (err: any) {
            next(err);
        }
    }

    public async pickUpShipment(req: RequestWithRequester, res: Response, next: NextFunction) {
        try {
            this.logger.info(`ShipmentController :: pickUpShipment :: ${JSON.stringify(req.body)}`);
            const shimpentInfo = { ...req.body, bikerId: req.requester?._id, shipmentStatus: ShipmentStatus.PICKED } as unknown as PickShipmentInfo;
            const [status, info] = await this.shipmentService.pickupShipment(shimpentInfo);
            if (!status) {
                switch (info) {
                    case 'notfound':
                        throw new BaseError(409, 'Shipment is not found');
                    case 'waiting':
                        throw new BaseError(609, 'Shipment can\'t be picked');
                }
            }
            return ResponseUtility.Success(200, true, res);
        } catch (err: any) {
            next(err);
        }
    }
}