import { CreateShipmentInfo } from "../../interfaces";
import { ShipmentRepositoryI } from "../../repository/ShipmentRepository.contract";

export default class ShipmentRepositoryMock implements ShipmentRepositoryI {
    async createShipment(shipmentInfo: CreateShipmentInfo): Promise<any> {
        return shipmentInfo;
    }
}