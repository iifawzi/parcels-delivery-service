import { AxiosResponse } from "axios";
import BaseService from "../base";
import { LoginBody, LoginResponse } from "./types";

class BikerServices extends BaseService {
    routeName = '/biker'

    login(Data: LoginBody): Promise<AxiosResponse<LoginResponse>> {
        return this.http.post<LoginResponse>(`${this.routeName}/login`, Data)
    }
}

export default new BikerServices()