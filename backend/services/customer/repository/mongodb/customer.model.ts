import mongoose from 'mongoose';

interface CustomerSchemaI {
	username: string,
	password: string,
	fullname: string
}

export const CustomerSchema = new mongoose.Schema<CustomerSchemaI>({
	username: { type: String, unique: true },
	password: { type: String },
	fullname: { type: String },
}, {
	timestamps: true
});


const CustomerModel = mongoose.model<CustomerSchemaI>('Customer', CustomerSchema);

export default CustomerModel;
