import { CustomerRepositoryI } from "../CustomerRepository.contract";
import CustomerModel from "./customer.model";

export default class MongoDBCustomerRepository implements CustomerRepositoryI {
    private CustomerModel = CustomerModel;

    public async findCustomer(username: string): Promise<any> {
        const customer = await this.CustomerModel.findOne({ username }).lean();
        return customer;
    }

}