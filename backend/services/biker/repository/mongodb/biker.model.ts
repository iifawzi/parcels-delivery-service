import mongoose from 'mongoose';

export interface bikerSchemaI {
	username: string,
	password: string,
	fullname: string
}

export const BikerSchema = new mongoose.Schema<bikerSchemaI>({
	username: { type: String, unique: true, index: true },
	password: { type: String },
	fullname: { type: String },
}, {
	timestamps: true
});


const BikerModel = mongoose.model<bikerSchemaI>('Biker', BikerSchema);

export default BikerModel;
