import { BikerRepositoryI } from "../BikerRepository.contract";
import BikerModel from "./biker.model";

export default class MongoDBBikerRepository implements BikerRepositoryI {
    private bikerModel = BikerModel;

    public async findBiker(username: string): Promise<any> {
        return await this.bikerModel.findOne({ username });
    }

}