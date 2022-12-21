import { inject, injectable } from "tsyringe";
import { ShipmentRepositoryI } from "./repository/ShipmentRepository.contract";
import { BaseLogger } from "@/interfaces";
import { CreateShipmentInfo, DeliverShipmentInfo } from "./interfaces";
import { MatchShipmentInfo } from "./interfaces";
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

    public async matchShipment(shipmentInfo: MatchShipmentInfo): Promise<any> {
        this.logger.info(`ShipmentService :: matchShipment :: ${JSON.stringify(shipmentInfo)}`);
        const shipment = await this.shipmentRepository.findShipment(shipmentInfo.shipmentId);
        if (!shipment) {
            return [false, 'notfound']
        }

        if (shipment.shipmentStatus !== ShipmentStatus.WAITING) {
            return [false, 'notwaiting']
        }

        const updatedInfo = { ...shipmentInfo } as Record<string, string>;
        delete updatedInfo.shipmentId;
        const updatedShipment = await this.shipmentRepository.updateShipment(shipmentInfo.shipmentId, updatedInfo);
        return [true, updatedShipment];
    }

    public async pickupShipment(shipmentInfo: DeliverShipmentInfo): Promise<any> {
        this.logger.info(`ShipmentService :: pickupShipment :: ${JSON.stringify(shipmentInfo)}`);
        const shipment = await this.shipmentRepository.findShipmentByIdAndBiker(shipmentInfo.shipmentId, shipmentInfo.biker);
        if (!shipment) {
            return [false, 'notfound']
        }

        if (shipment.shipmentStatus !== ShipmentStatus.MATCHED) {
            return [false, 'notmatched']
        }

        const updatedInfo = { ...shipmentInfo } as Record<string, string>;
        delete updatedInfo.shipmentId;
        const updatedShipment = await this.shipmentRepository.updateShipment(shipmentInfo.shipmentId, updatedInfo);
        return [true, updatedShipment];
    }

    public async deliverShipment(shipmentInfo: DeliverShipmentInfo): Promise<any> {
        this.logger.info(`ShipmentService :: deliverShipment :: ${JSON.stringify(shipmentInfo)}`);
        const shipment = await this.shipmentRepository.findShipmentByIdAndBiker(shipmentInfo.shipmentId, shipmentInfo.biker);
        if (!shipment) {
            return [false, 'notfound']
        }

        if (shipment.shipmentStatus !== ShipmentStatus.PICKED) {
            return [false, 'notpicked']
        }

        const updatedInfo = { ...shipmentInfo } as Record<string, string>;
        delete updatedInfo.shipmentId;
        const updatedShipment = await this.shipmentRepository.updateShipment(shipmentInfo.shipmentId, updatedInfo);
        return [true, updatedShipment];
    }

    public async getWaitingShipments(): Promise<any> {
        this.logger.info(`ShipmentService :: getWaitingShipments ::`);
        const shipments = await this.shipmentRepository.findWaitingShipments();
        return shipments;
    }

}