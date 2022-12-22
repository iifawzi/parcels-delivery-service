export interface ShipmentInfo {
    _id: string,
    pickUpAddress: string,
    pickOfAddress: string,
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
