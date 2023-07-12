import Joi from "joi";

// Validation
const userSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
	phone:Joi.string().min(6).max(10).required()
})

export default userSchema;