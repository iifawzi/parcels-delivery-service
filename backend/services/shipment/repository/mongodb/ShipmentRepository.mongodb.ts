import { CreateShipmentInfo } from "../../interfaces";
import { ShipmentRepositoryI } from "../ShipmentRepository.contract";
import ShipmentModel from "./shipment.model";

export default class ShipmentRepositoryMongoDB implements ShipmentRepositoryI {
    private shipmentModel = ShipmentModel;

    async createShipment(shipmentInfo: CreateShipmentInfo): Promise<any> {
        const shipment = await this.shipmentModel.create(shipmentInfo);
        return shipment;
    }
}