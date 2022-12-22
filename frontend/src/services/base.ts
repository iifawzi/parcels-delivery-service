import axios, { AxiosInstance } from "axios"
import Cookies from "js-cookie"

abstract class BaseService {

  private axiosInstance: AxiosInstance
  protected abstract routeName: string

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_LINK
    })
  }

  get http() {
    const token = Cookies.get('authorization')
    if (token) {
      this.axiosInstance.defaults.headers.authorization = "Bearer " + token
    }
    return this.axiosInstance
  }
}

export default BaseService