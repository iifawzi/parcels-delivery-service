import { BikerRepositoryI } from "../../repository/BikerRepository.contract";

export default class BikerRepositoryMock implements BikerRepositoryI {
    private bikers: Record<string, Record<string, any>> = {
        biker1: {
            _id: "63a22b00a704bee4b0254f56",
            username: "biker1",
            password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi",
            fullName: "Biker Number 1"
        },
        biker2: {
            _id: "63a22b00a704bee4b0254f4d",
            username: "biker2",
            password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi",
            fullName: "Biker Number 2"
        }
    };
    async findBiker(username: string): Promise<any> {
        if (this.bikers[username]) {
            return this.bikers[username];
        }
        return null;
    }

}