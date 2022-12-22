import { AxiosResponse } from "axios";
import BaseService from "../base";
import { LoginBody, LoginResponse } from "./types";

class CustomerServices extends BaseService {
    routeName = '/customer'

    login(Data: LoginBody): Promise<AxiosResponse<LoginResponse>> {
        return this.http.post<LoginResponse>(`${this.routeName}/login`, Data)
    }
}

export default new CustomerServices()