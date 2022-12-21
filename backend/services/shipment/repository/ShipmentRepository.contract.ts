import { CreateShipmentInfo } from "../interfaces";

export interface ShipmentRepositoryI {
    createShipment(shipmentInfo: CreateShipmentInfo): Promise<any>
}