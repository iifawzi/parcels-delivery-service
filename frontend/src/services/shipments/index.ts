import { AxiosResponse } from "axios";
import BaseService from "../base";
import { CreateShipmentBody, CreateShipmentResponse, CustomerShipmentsResponse } from "./types";

class ShipmentsServices extends BaseService {
    routeName = '/shipment'

    async CustomerShipments(): Promise<AxiosResponse<CustomerShipmentsResponse>> {
        return await this.http.get<CustomerShipmentsResponse>(`${this.routeName}/customerShipments`)
    }

    async CreateShipment(data: CreateShipmentBody): Promise<AxiosResponse<CreateShipmentResponse>> {
        return await this.http.post<CreateShipmentResponse>(`${this.routeName}/`, data);
    }
}

export default new ShipmentsServices()