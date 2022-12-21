import { inject, injectable } from "tsyringe";
import { CustomerRepositoryI } from "./repository/CustomerRepository.contract";
import { BaseLogger } from "@/interfaces";
import { comparePassword, createToken } from "@/helpers";
import { TOKENS } from '@/di/Tokens';

@injectable()
export default class CustomerService {
    constructor(@inject(TOKENS.customerRepository) private customerRepository: CustomerRepositoryI, @inject(TOKENS.logger) private logger: BaseLogger) {
        this.customerRepository = customerRepository;
        this.logger = logger;
    }

    public async login(username: string, password: string): Promise<any> {
        this.logger.info(`CustomerService :: login :: ${username}`);
        const customer = await this.customerRepository.findCustomer(username);
        if (!customer) {
            this.logger.error(`CustomerService :: login :: 401 :: ${username}`);
            return [false, null];
        }
        const passwordIsSame = await comparePassword(password, customer.password);
        if (!passwordIsSame) {
            this.logger.error(`CustomerService :: login :: invalid password ::`);
            return [false, null];
        }

        delete customer.password;
        const token = createToken({ ...customer, role: 'customer' });
        return [true, { ...customer, token }];
    }
}