import { Document, Types } from "mongoose";
import { BikerRepositoryI } from "../BikerRepository.contract";
import BikerModel, { BikerI } from "./biker.model";

export default class MongoDBBikerRepository implements BikerRepositoryI {
    private bikerModel = BikerModel;

    public async findBiker(username: string): Promise<any> {
        const biker: & BikerI & { _id: Types.ObjectId } | null  = await this.bikerModel.findOne({ username }).lean();
        return biker;
    }

}