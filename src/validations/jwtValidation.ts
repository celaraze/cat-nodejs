import Joi from "joi";

const payloadValidation = Joi.object({
    id: Joi.number().required(),
})

export {payloadValidation}