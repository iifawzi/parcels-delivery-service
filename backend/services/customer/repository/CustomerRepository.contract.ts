export interface CustomerRepositoryI {
    findCustomer(username: string): Promise<any>
}