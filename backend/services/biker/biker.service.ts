import { inject, injectable } from "tsyringe";
import { BikerRepositoryI } from "./repository/BikerRepository.contract";
import { BaseLogger } from "@/interfaces";
import { comparePassword, createToken } from "@/helpers";
import { BaseError } from "@/providers";

@injectable()
export default class BikerService {
    constructor(@inject('bikerRepository') private bikerRepository: BikerRepositoryI, @inject('logger') private logger: BaseLogger) {
        this.bikerRepository = bikerRepository;
        this.logger = logger;
    }

    public async login(username: string, password: string): Promise<any> {
        this.logger.info(`BikerService :: login :: ${username}`);
        const biker = await this.bikerRepository.findBiker(username);
        if (!biker) {
            this.logger.error(`BikerService :: login :: 401 :: ${username}`);
            return [false, null];
        }
        const passwordIsSame = await comparePassword(password, biker.password);
        if (!passwordIsSame) {
            this.logger.error(`BikerService :: login :: invalid password ::`);
            return [false, 'null'];
        }

        delete biker.password;
        const token = createToken({ ...biker, role: 'biker' });
        return [true, { ...biker, token }];
    }
}