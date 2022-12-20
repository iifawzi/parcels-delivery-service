import mongoose from 'mongoose';

interface BikerI {
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


const Biker = mongoose.model<BikerI>('Biker', BikerSchema);

export default Biker;
