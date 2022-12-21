import Joi from "joi"

export const createShipmentSchema = Joi.object({
    shipmentDescription: Joi.string().required(),
    pickUpAddress: Joi.string().required(),
    pickOfAddress: Joi.string().required(),
});
