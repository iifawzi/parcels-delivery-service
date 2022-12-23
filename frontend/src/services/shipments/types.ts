export interface ShipmentInfo {
    _id: string,
    pickUpAddress: string,
    dropOfAddress: string,
    shipmentStatus: string
    shipmentDescription: string,
    deliveryTime?: string,
    pickupTime?: string,
    biker?: {
        fullName: string
    }
}
export interface CustomerShipmentsResponse {
    data: [ShipmentInfo]
}

export interface CreateShipmentBody {
    pickUpAddress: string,
    dropOfAddress: string,
    shipmentDescription: string
}

export interface CreateShipmentResponse {
    pickUpAddress: string,
    dropOfAddress: string,
    shipmentDescription: string
}