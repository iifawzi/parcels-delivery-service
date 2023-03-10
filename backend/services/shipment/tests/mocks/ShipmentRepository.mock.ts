import { CreateShipmentInfo } from "../../interfaces";
import { ShipmentRepositoryI } from "../../repository/ShipmentRepository.contract";

export default class ShipmentRepositoryMock implements ShipmentRepositoryI {
    private shipmentsOriginal: Record<string, any> = {
        "63a271ebbe91afafb4d48c62": {
            pickUpAddress: "Egypt",
            dropOfAddress: "Germany",
            shipmentDescription: "WATCH",
            shipmentStatus: "WAITING",
            customer: "63a22b00a704bee4b0254f4d",
            biker: "63a22b00a704bee4b0254f4c",
            deliveryTime: new Date().getTime(),
            pickupTime: new Date().getTime(),
        },
        "63a271ebbe91afafb4d48c61": {
            customer: "63a22b00a704bee4b0254f4d",
            pickUpAddress: "Egypt",
            dropOfAddress: "Germany",
            shipmentDescription: "WATCH",
            shipmentStatus: "PICKED",
        },
        "63a271ebbe91afafb4d48c63": {
            customer: "63a22b00a704bee4b0254f4d",
            pickUpAddress: "Egypt",
            dropOfAddress: "Germany",
            shipmentDescription: "WATCH",
            shipmentStatus: "WAITING",
            biker: "63a22b00a704bee4b0254f4c",
            deliveryTime: new Date().getTime(),
            pickupTime: new Date().getTime(),
        },
        "63a271ebbe91afafb4d48c64": {
            customer: "63a22b00a704bee4b0254f4d",
            pickUpAddress: "Egypt",
            dropOfAddress: "Germany",
            shipmentDescription: "WATCH",
            shipmentStatus: "PICKED",
            biker: "63a22b00a704bee4b0254f4e",
            deliveryTime: new Date().getTime(),
            pickupTime: new Date().getTime(),
        },
        "63a271ebbe91afafb4d48c65": {
            customer: "63a22b00a704bee4b0254f4d",
            pickUpAddress: "Egypt",
            dropOfAddress: "Germany",
            shipmentDescription: "WATCH",
            shipmentStatus: "DELIVERED",
            biker: "63a22b00a704bee4b0254f4e",
            deliveryTime: new Date().getTime(),
            pickupTime: new Date().getTime(),
        },
        "63a271ebbe91afafb4d48c66": {
            customer: "63a22b00a704bee4b0254f4d",
            pickUpAddress: "Egypt",
            dropOfAddress: "Germany",
            shipmentDescription: "WATCH",
            shipmentStatus: "MATCHED",
            biker: "63a22b00a704bee4b0254f4c",
            deliveryTime: new Date().getTime(),
            pickupTime: new Date().getTime(),
        },
        "63a271ebbe91afafb4d48c67": {
            customer: "63a22b00a704bee4b0254f4d",
            pickUpAddress: "Egypt",
            dropOfAddress: "Germany",
            shipmentDescription: "WATCH",
            shipmentStatus: "PICKED",
            biker: "63a22b00a704bee4b0254f4c",
            deliveryTime: new Date().getTime(),
            pickupTime: new Date().getTime(),
        },
    };

    private shipments = this.shipmentsOriginal;

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

    async findShipmentByIdAndBiker(shipmentId: string, biker: string): Promise<any> {
        if (this.shipments[shipmentId]) {
            if (this.shipments[shipmentId].biker != biker) {
                return null;
            }
            return this.shipments[shipmentId]
        }
        return null;
    }

    async findWaitingShipments(): Promise<any> {
        return Object.values(this.shipments).filter(shipment => shipment.shipmentStatus === 'WAITING').map(shipment => {
            return {
                ...shipment,
                customer: {
                    fullName: 'Customer',
                }
            }
        });
    }

    async findCustomerShipments(customer: string): Promise<any> {
        return Object.values(this.shipments).filter(shipment => shipment.customer === customer).map(shipment => {
            return {
                ...shipment,
                biker: {
                    fullName: 'Biker',
                }
            }
        });
    }
    
    async findBikerShipments(biker: string): Promise<any> {
        return Object.values(this.shipments).filter(shipment => shipment.biker === biker);

    }
}