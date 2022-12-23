import { AxiosResponse } from "axios";
import BaseService from "../base";
import { LoginBody, LoginResponse } from "./types";

class CustomerServices extends BaseService {
    routeName = '/customer'

    async login(Data: LoginBody): Promise<AxiosResponse<LoginResponse>> {
        return await this.http.post<LoginResponse>(`${this.routeName}/login`, Data)
    }
}

export default new CustomerServices()