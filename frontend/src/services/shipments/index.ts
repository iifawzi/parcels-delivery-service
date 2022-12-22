import { AxiosResponse } from "axios";
import BaseService from "../base";
import { CustomerShipmentsResponse } from "./types";

class ShipmentsServices extends BaseService {
    routeName = '/shipment'

    CustomerShipments(): Promise<AxiosResponse<CustomerShipmentsResponse>> {
        return this.http.get<CustomerShipmentsResponse>(`${this.routeName}/customerShipments`)
    }
}

export default new ShipmentsServices()