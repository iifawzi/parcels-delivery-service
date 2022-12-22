import { CreateShipmentInfo } from "../interfaces";
export interface ShipmentRepositoryI {
    createShipment(shipmentInfo: CreateShipmentInfo): Promise<any>,
    findShipment(shipmentId: string): Promise<any>,
    updateShipment(shipmentId: string, updatedInfo: any): Promise<any>,
    findShipmentByIdAndBiker(shipmentId: string, biker: string): Promise<any>,
    findWaitingShipments(): Promise<any>,
    findCustomerShipments(customer: string): Promise<any>,
    findBikerShipments(biker: string): Promise<any>,
}