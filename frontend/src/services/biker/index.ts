import { AxiosResponse } from "axios";
import BaseService from "../base";
import { LoginBody, LoginResponse } from "./types";

class BikerServices extends BaseService {
    routeName = '/biker'

    async login(Data: LoginBody): Promise<AxiosResponse<LoginResponse>> {
        return await this.http.post<LoginResponse>(`${this.routeName}/login`, Data)
    }
}

export default new BikerServices()