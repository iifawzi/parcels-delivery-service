import { CreateShipmentInfo } from "../../interfaces";
import { PickShipmentInfo } from "../../interfaces/pickShipmentInfo";
import { ShipmentRepositoryI } from "../../repository/ShipmentRepository.contract";

export default class ShipmentRepositoryMock implements ShipmentRepositoryI {
    private shipments: Record<string, any> = {
        "63a271ebbe91afafb4d48c62": {
            customerId: "63a22b00a704bee4b0254f56",
            pickUpAddress: "Egypt",
            pickOfAddress: "Germany",
            shipmentStatus: "WAITING",
        },
        "63a271ebbe91afafb4d48c61": {
            customerId: "63a22b00a704bee4b0254f56",
            pickUpAddress: "Egypt",
            pickOfAddress: "Germany",
            shipmentStatus: "PICKED",
        },
    };

    async findShipment(shipmentId: string): Promise<any> {
        if (this.shipments[shipmentId]) {
            return this.shipments[shipmentId]
        }
        return null;
    }

    async updateShipment(shipmentId: string, updatedInfo: any): Promise<any> {
        this.shipments[shipmentId] = {
            ...this.shipments[updatedInfo.shipmentId],
            bikerId: updatedInfo.bikerId,
            deliveryTime: updatedInfo.deliveryTime,
            pickupTime: updatedInfo.pickupTime,
            shipmentStatus: 'PICKED'
        }
    }

    async createShipment(shipmentInfo: CreateShipmentInfo): Promise<any> {
        this.shipments[new Date().getTime()] = shipmentInfo;
        return shipmentInfo;
    }
}