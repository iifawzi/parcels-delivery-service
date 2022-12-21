import { CreateShipmentInfo } from "../../interfaces";
import { PickShipmentInfo } from "../../interfaces/pickShipmentInfo";
import { ShipmentRepositoryI } from "../ShipmentRepository.contract";
import ShipmentModel from "./shipment.model";

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

    async pickupShipment(shipmentInfo: PickShipmentInfo): Promise<any> {
        const shipment = await this.shipmentModel.create(shipmentInfo);
        return shipment;
    }

}