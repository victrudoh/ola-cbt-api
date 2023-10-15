// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const signUpSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  matric_no: Joi.string(),
  email: Joi.string().min(6).email(),
  password: Joi.string().min(4).required(),
});
const loginSchema = Joi.object({
  matric_no: Joi.string(),
  email: Joi.string().min(6).email(),
  password: Joi.string().min(4).required(),
});

module.exports = {
  signUpSchema,
  loginSchema,
};
