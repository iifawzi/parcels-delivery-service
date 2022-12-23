import { AxiosResponse } from "axios";
import BaseService from "../base";
import { BikerShipmentsResponse, CreateShipmentBody, CreateShipmentResponse, CustomerShipmentsResponse, UpdatedShipmentResponse } from "./types";

class ShipmentsServices extends BaseService {
    routeName = '/shipment'

    async CustomerShipments(): Promise<AxiosResponse<CustomerShipmentsResponse>> {
        return await this.http.get<CustomerShipmentsResponse>(`${this.routeName}/customerShipments`)
    }

    async CreateShipment(data: CreateShipmentBody): Promise<AxiosResponse<CreateShipmentResponse>> {
        return await this.http.post<CreateShipmentResponse>(`${this.routeName}/`, data);
    }

    async BikerShipments(): Promise<AxiosResponse<BikerShipmentsResponse>> {
        return await this.http.get<BikerShipmentsResponse>(`${this.routeName}/bikerShipments`)
    }

    async markAsPicked(shipmentId: string): Promise<AxiosResponse<UpdatedShipmentResponse>> {
        return await this.http.patch<UpdatedShipmentResponse>(`${this.routeName}/pickup`, { shipmentId })
    }

    async markAsDelivered(shipmentId: string): Promise<AxiosResponse<UpdatedShipmentResponse>> {
        return await this.http.patch<UpdatedShipmentResponse>(`${this.routeName}/deliver`, { shipmentId })
    }
}

export default new ShipmentsServices()