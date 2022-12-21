import mongoose, { Schema } from 'mongoose';

export enum ShipmentStatus {
	WAITING = "WAITING",
	MATCHED = "MATCHED",
	PICKED = "PICKED",
	DELIVERED = "DELIVERED",
}

interface shipmentSchemaI {
	shipmentDescripton: string,
	customerId: Schema.Types.ObjectId,
	pickUpAddress: string,
	pickOfAddress: string,
	shipmentStatus: ShipmentStatus,
	bikerId?: Schema.Types.ObjectId
	pickUpTime?: number,
	deliveryTime?: number,
}

export const ShipmentSchema = new mongoose.Schema<shipmentSchemaI>({
	shipmentDescripton: { type: String },
	customerId: { type: Schema.Types.ObjectId, ref: 'customers' },
	pickUpAddress: { type: String },
	pickOfAddress: { type: String },
	shipmentStatus: { type: String, enum: ShipmentStatus },
	bikerId: { type: Schema.Types.ObjectId, ref: 'bikers', required: false },
	pickUpTime: { type: Number, required: false },
	deliveryTime: { type: Number, required: false },
}, {
	timestamps: true
});


const ShipmentModel = mongoose.model<shipmentSchemaI>('Shipment', ShipmentSchema);

export default ShipmentModel;
