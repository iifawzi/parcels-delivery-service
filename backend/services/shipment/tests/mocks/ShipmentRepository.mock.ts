import { CreateShipmentInfo } from "../../interfaces";
import { PickShipmentInfo } from "../../interfaces";
import { ShipmentRepositoryI } from "../../repository/ShipmentRepository.contract";

export default class ShipmentRepositoryMock implements ShipmentRepositoryI {
    private shipments: Record<string, any> = {
        "63a271ebbe91afafb4d48c62": {
            pickUpAddress: "Egypt",
            pickOfAddress: "Germany",
            shipmentStatus: "WAITING",
            customer: {
                fullName: "Fawzi",
            }
        },
        "63a271ebbe91afafb4d48c61": {
            customerId: "63a22b00a704bee4b0254f56",
            pickUpAddress: "Egypt",
            pickOfAddress: "Germany",
            shipmentStatus: "PICKED",
        },
        "63a271ebbe91afafb4d48c63": {
            customer: "63a22b00a704bee4b0254f56",
            pickUpAddress: "Egypt",
            pickOfAddress: "Germany",
            shipmentStatus: "PICKED",
            biker: "63a22b00a704bee4b0254f4c",
            deliveryTime: new Date().getTime(),
            pickupTime: new Date().getTime(),
        },
        "63a271ebbe91afafb4d48c64": {
            customer: "63a22b00a704bee4b0254f56",
            pickUpAddress: "Egypt",
            pickOfAddress: "Germany",
            shipmentStatus: "PICKED",
            biker: "63a22b00a704bee4b0254f4e",
            deliveryTime: new Date().getTime(),
            pickupTime: new Date().getTime(),
        },
        "63a271ebbe91afafb4d48c65": {
            customer: "63a22b00a704bee4b0254f56",
            pickUpAddress: "Egypt",
            pickOfAddress: "Germany",
            shipmentStatus: "DELIVERED",
            biker: "63a22b00a704bee4b0254f4e",
            deliveryTime: new Date().getTime(),
            pickupTime: new Date().getTime(),
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
            ...updatedInfo
        }
    }

    async createShipment(shipmentInfo: CreateShipmentInfo): Promise<any> {
        this.shipments[new Date().getTime()] = shipmentInfo;
        return shipmentInfo;
    }

    async findShipmentByIdAndBiker(shipmentId: string, bikerId: string): Promise<any> {
        if (this.shipments[shipmentId]) {
            if (this.shipments[shipmentId].biker != bikerId) {
                return null;
            }
            return this.shipments[shipmentId]
        }
        return null;
    }

    async findWaitingShipments(): Promise<any> {
        return Object.values(this.shipments).filter(shipment => shipment.shipmentStatus === 'WAITING');
    }
}