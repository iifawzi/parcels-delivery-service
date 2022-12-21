import { inject, injectable } from "tsyringe";
import { ShipmentRepositoryI } from "./repository/ShipmentRepository.contract";
import { BaseLogger } from "@/interfaces";
import { CreateShipmentInfo } from "./interfaces";

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

}