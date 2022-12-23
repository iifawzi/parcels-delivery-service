export interface ShipmentInfo {
    _id: string,
    pickUpAddress: string,
    dropOfAddress: string,
    shipmentStatus: string
    shipmentDescription: string,
}

export interface WaitingShipmentInfo extends ShipmentInfo {
    customer: {
        fullName: string
    }
}

export interface CustomerShipmentInfo extends ShipmentInfo{
    deliveryTime?: string,
    pickupTime?: string,
    biker?: {
        fullName: string
    }
}
export interface BikerShipmentInfo extends ShipmentInfo {
    deliveryTime?: string,
    pickupTime?: string,
    customer: {
        fullName: string
    }
}

export interface CustomerShipmentsResponse {
    data: [CustomerShipmentInfo]
}

export interface BikerShipmentsResponse {
    data: [BikerShipmentInfo]
}

export interface WaitingShipmentsResponse {
    data: [WaitingShipmentInfo]
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

export interface UpdatedShipmentResponse {
    data: boolean
}