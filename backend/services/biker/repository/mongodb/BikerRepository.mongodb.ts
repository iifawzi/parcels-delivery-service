import { BikerRepositoryI } from "../BikerRepository.contract";
import Biker from "./biker.model";

export default class MongoDBBikerRepository implements BikerRepositoryI {
    private bikerModel = Biker;

    public async findBiker(username: string): Promise<any> {
        return this.bikerModel.findOne({ username });
    }

}