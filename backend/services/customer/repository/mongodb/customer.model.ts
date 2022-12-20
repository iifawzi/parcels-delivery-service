import mongoose from 'mongoose';

interface customerI {
	username: string,
	password: string,
	fullname: string
}

export const CustomerSchema = new mongoose.Schema<customerI>({
	username: { type: String, unique: true },
	password: { type: String },
	fullname: { type: String },
}, {
	timestamps: true
});


const CustomerModel = mongoose.model<customerI>('Customer', CustomerSchema);

export default CustomerModel;
