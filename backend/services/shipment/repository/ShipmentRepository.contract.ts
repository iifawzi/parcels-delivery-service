import { CreateShipmentInfo } from "../interfaces";
import { PickShipmentInfo } from "../interfaces/pickShipmentInfo";

export interface ShipmentRepositoryI {
    createShipment(shipmentInfo: CreateShipmentInfo): Promise<any>,
    findShipment(shipmentId: string): Promise<any>,
    updateShipment(shipmentId: string, updatedInfo: any): Promise<any>,
}