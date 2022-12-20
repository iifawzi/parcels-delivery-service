import Joi from "joi"

export const signinSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});
