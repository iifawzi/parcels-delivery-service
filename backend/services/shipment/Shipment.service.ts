import { inject, injectable } from "tsyringe";
import { ShipmentRepositoryI } from "./repository/ShipmentRepository.contract";
import { BaseLogger } from "@/interfaces";

@injectable()
export default class BikerService {
    constructor(@inject('shipmentRepository') private shipmentRepository: ShipmentRepositoryI, @inject('logger') private logger: BaseLogger) {
        this.shipmentRepository = shipmentRepository;
        this.logger = logger;
    }
}