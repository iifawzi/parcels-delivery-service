import { inject, injectable } from "tsyringe";
import ShipmentService from "./Shipment.service";
import { BaseLogger, RequestWithRequester } from "@/interfaces";
import { NextFunction, Response } from "express";
import { CreateShipmentInfo, DeliverShipmentInfo, MatchShipmentInfo, PickupShipmentInfo } from "./interfaces";
import { ResponseUtility } from "@/utils/Response";
import { ShipmentStatus } from "./repository/mongodb/shipment.model";
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
            const shimpentInfo = { ...req.body, customer: req.requester?._id, shipmentStatus: ShipmentStatus.WAITING } as unknown as CreateShipmentInfo;
            const [_, shipmentData] = await this.shipmentService.addShipment(shimpentInfo);
            return ResponseUtility.Success(201, shipmentData, res);
        } catch (err: any) {
            next(err);
        }
    }

    public async matchShipment(req: RequestWithRequester, res: Response, next: NextFunction) {
        try {
            this.logger.info(`ShipmentController :: matchShipment :: ${JSON.stringify(req.body)}`);
            const shimpentInfo = { ...req.body, biker: req.requester?._id, shipmentStatus: ShipmentStatus.MATCHED } as unknown as MatchShipmentInfo;
            const [status, info] = await this.shipmentService.matchShipment(shimpentInfo);
            if (!status) {
                switch (info) {
                    case 'notfound':
                        throw new BaseError(409, 'Shipment is not found');
                    case 'notwaiting':
                        throw new BaseError(609, 'Shipment can\'t be picked');
                }
            }
            return ResponseUtility.Success(200, true, res);
        } catch (err: any) {
            next(err);
        }
    }

    public async pickupShipment(req: RequestWithRequester, res: Response, next: NextFunction) {
        try {
            this.logger.info(`ShipmentController :: pickupShipment :: ${JSON.stringify(req.body)}`);
            const shimpentInfo = { ...req.body, biker: req.requester?._id, shipmentStatus: ShipmentStatus.PICKED } as unknown as PickupShipmentInfo;
            const [status, info] = await this.shipmentService.pickupShipment(shimpentInfo);
            if (!status) {
                switch (info) {
                    case 'notfound':
                        throw new BaseError(409, 'Shipment is not found');
                    case 'notmatched':
                        throw new BaseError(609, 'Shipment can\'t be picked');
                }
            }
            return ResponseUtility.Success(200, true, res);
        } catch (err: any) {
            next(err);
        }
    }

    public async deliverShipment(req: RequestWithRequester, res: Response, next: NextFunction) {
        try {
            this.logger.info(`ShipmentController :: deliverShipment :: ${JSON.stringify(req.body)}`);
            const shimpentInfo = { ...req.body, biker: req.requester?._id, shipmentStatus: ShipmentStatus.DELIVERED } as unknown as DeliverShipmentInfo;
            const [status, info] = await this.shipmentService.deliverShipment(shimpentInfo);
            if (!status) {
                switch (info) {
                    case 'notfound':
                        throw new BaseError(409, 'Shipment is not found');
                    case 'notpicked':
                        throw new BaseError(609, 'Shipment can\'t be delivered');
                }
            }
            return ResponseUtility.Success(200, true, res);
        } catch (err: any) {
            next(err);
        }
    }

    public async getWaitingShipments(req: RequestWithRequester, res: Response, next: NextFunction) {
        try {
            this.logger.info(`ShipmentController :: getWaitingShipments :: ${JSON.stringify(req.body)}`);
            const data = await this.shipmentService.getWaitingShipments();
            return ResponseUtility.Success(200, data, res);
        } catch (err: any) {
            next(err);
        }
    }
}