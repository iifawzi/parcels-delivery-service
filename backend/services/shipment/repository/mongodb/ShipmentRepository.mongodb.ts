import { CreateShipmentInfo, MatchShipmentInfo } from "../../interfaces";
import { ShipmentRepositoryI } from "../ShipmentRepository.contract";
import ShipmentModel, { ShipmentStatus } from "./shipment.model";

export default class ShipmentRepositoryMongoDB implements ShipmentRepositoryI {
    private shipmentModel = ShipmentModel;

    async createShipment(shipmentInfo: CreateShipmentInfo): Promise<any> {
        const shipment = await this.shipmentModel.create(shipmentInfo);
        return shipment;
    }

    async findShipment(shipmentId: string): Promise<any> {
        const shipment = await this.shipmentModel.findOne({ _id: shipmentId }).lean();
        return shipment;
    }

    async updateShipment(shipmentId: string, updatedInfo: any): Promise<any> {
        const shipment = await this.shipmentModel.updateOne({ _id: shipmentId }, updatedInfo).lean();
        return shipment;
    }

    async pickupShipment(shipmentInfo: MatchShipmentInfo): Promise<any> {
        const shipment = await this.shipmentModel.create(shipmentInfo);
        return shipment;
    }

    async findShipmentByIdAndBiker(shipmentId: string, bikerId: string): Promise<any> {
        const shipment = await this.shipmentModel.findOne({ _id: shipmentId, bikerId }).lean();
        return shipment;
    }

    async findWaitingShipments(): Promise<any> {
        const shipments = await this.shipmentModel.find({ shipmentStatus: ShipmentStatus.WAITING }).populate('customer', 'fullName -_id').lean();
        return shipments;
    }
}