import mongoose, { Schema } from 'mongoose';

export enum ShipmentStatus {
	WAITING = "WAITING",
	MATCHED = "MATCHED",
	PICKED = "PICKED",
	DELIVERED = "DELIVERED",
}

interface shipmentSchemaI {
	shipmentDescription: string,
	customer: Schema.Types.ObjectId,
	pickUpAddress: string,
	pickOfAddress: string,
	shipmentStatus: ShipmentStatus,
	biker?: Schema.Types.ObjectId
	pickupTime?: number,
	deliveryTime?: number,
}

export const ShipmentSchema = new mongoose.Schema<shipmentSchemaI>({
	shipmentDescription: { type: String },
	customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
	pickUpAddress: { type: String },
	pickOfAddress: { type: String },
	shipmentStatus: { type: String, enum: ShipmentStatus },
	biker: { type: Schema.Types.ObjectId, ref: 'Biker', required: false },
	pickupTime: { type: Number, required: false },
	deliveryTime: { type: Number, required: false },
}, {
	timestamps: true
});


const ShipmentModel = mongoose.model<shipmentSchemaI>('Shipment', ShipmentSchema);

export default ShipmentModel;
