import { Document, Types } from "mongoose";
import { BikerRepositoryI } from "../BikerRepository.contract";
import BikerModel, { bikerSchemaI } from "./biker.model";

export default class BikerRepositoryMongoDB implements BikerRepositoryI {
    private bikerModel = BikerModel;

    public async findBiker(username: string): Promise<any> {
        const biker = await this.bikerModel.findOne({ username }).lean();
        return biker;
    }

}