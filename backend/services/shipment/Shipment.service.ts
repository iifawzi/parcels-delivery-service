import { inject, injectable } from "tsyringe";
import { ShipmentRepositoryI } from "./repository/ShipmentRepository.contract";
import { BaseLogger } from "@/interfaces";
import { CreateShipmentInfo } from "./interfaces";
import { PickShipmentInfo } from "./interfaces/pickShipmentInfo";
import { ShipmentStatus } from "./repository/mongodb/shipment.model";

@injectable()
export default class ShipmentService {
    constructor(@inject('shipmentRepository') private shipmentRepository: ShipmentRepositoryI, @inject('logger') private logger: BaseLogger) {
        this.shipmentRepository = shipmentRepository;
        this.logger = logger;
    }

    public async addShipment(shipmentInfo: CreateShipmentInfo): Promise<any> {
        this.logger.info(`ShipmentService :: createShipment :: ${JSON.stringify(shipmentInfo)}`);
        const shipmentData = await this.shipmentRepository.createShipment(shipmentInfo);
        return [true, shipmentData];
    }

    public async pickupShipment(shipmentInfo: PickShipmentInfo): Promise<any> {
        this.logger.info(`ShipmentService :: pickupShipment :: ${JSON.stringify(shipmentInfo)}`);
        const shipment = await this.shipmentRepository.findShipment(shipmentInfo.shipmentId);
        if (!shipment) {
            return [false, 'notfound']
        }

        if (shipment.shipmentStatus !== ShipmentStatus.WAITING) {
            return [false, 'waiting']
        }

        const updatedInfo = { ...shipmentInfo } as Record<string, string>;
        delete updatedInfo.shipmentId;
        const updatedShipment = await this.shipmentRepository.updateShipment(shipmentInfo.shipmentId, updatedInfo);
        return [true, updatedShipment];
    }

}