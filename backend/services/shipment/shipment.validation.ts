import Joi from "joi"

export const createShipmentSchema = Joi.object({
    shipmentDescription: Joi.string().required(),
    pickUpAddress: Joi.string().required(),
    pickOfAddress: Joi.string().required(),
});

export const pickupShipmentSchema = Joi.object({
    shipmentId: Joi.string().required(),
    pickupTime: Joi.number().required(),
    deliveryTime: Joi.number().required()
});

export const deliverShipmentSchema = Joi.object({
    shipmentId: Joi.string().required(),
});
