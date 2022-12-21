import { ShipmentRepositoryI } from "../ShipmentRepository.contract";
import ShipmentModel from "./shipment.model";

export default class ShipmentRepositoryMongoDB implements ShipmentRepositoryI {
    private shipmentModel = ShipmentModel;
}