import mongoose from 'mongoose';

export interface BikerI {
	username: string,
	password: string,
	fullname: string
}

export const BikerSchema = new mongoose.Schema<BikerI>({
	username: { type: String, unique: true },
	password: { type: String },
	fullname: { type: String },
}, {
	timestamps: true
});


const BikerModel = mongoose.model<BikerI>('Biker', BikerSchema);

export default BikerModel;
