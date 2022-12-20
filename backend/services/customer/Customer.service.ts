import { inject, injectable } from "tsyringe";
import { CustomerRepositoryI } from "./repository/CustomerRepository.contract";
import { BaseLogger } from "@/interfaces";

@injectable()
export default class CustomerService {
    constructor(@inject('customerRepository') private customerRepository: CustomerRepositoryI, @inject('logger') private logger: BaseLogger) {
        this.customerRepository = customerRepository;
        this.logger = logger;
    }

    public async findCustomer(username: string): Promise<any> {
        this.logger.info(`CustomerService :: findCustomer :: ${username}`);
        const user = await this.customerRepository.findCustomer(username);
        return user._doc ?? null;
    }
}