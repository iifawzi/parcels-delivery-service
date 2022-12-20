import { CustomerRepositoryI } from "../../repository/CustomerRepository.contract";

export default class CustomerRepositoryMock implements CustomerRepositoryI {

    private customers: Record<string, Record<string, any>> = {
        customer1: {
            _id: "63a22b00a704bee4b0254f56",
            username: "customer1",
            password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi",
            fullName: "Customer Number 1"
        },
        customer2: {
            _id: "63a22b00a704bee4b0254f4d",
            username: "customer2",
            password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi",
            fullName: "Customer Number 2"
        }
    };

    async findCustomer(username: string): Promise<any> {
        if (this.customers[username]) {
            return this.customers[username];
        }
        return null;
    }

}