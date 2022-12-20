import { inject, injectable } from "tsyringe";
import { BikerRepositoryI } from "./repository/BikerRepository.contract";
import { BaseLogger } from "@/interfaces";

@injectable()
export default class BikerService {
    constructor(@inject('bikerRepository') private bikerRepository: BikerRepositoryI, @inject('logger') private logger: BaseLogger) {
        this.bikerRepository = bikerRepository;
        this.logger = logger;
    }

    public async findBiker(username: string): Promise<any> {
        this.logger.info(`BikerService :: findBiker :: ${username}`);
        const user = await this.bikerRepository.findBiker(username);
        return user._doc ?? null;
    }
}