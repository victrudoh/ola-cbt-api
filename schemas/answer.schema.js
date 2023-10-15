// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const addAnswerSchema = Joi.object({
  content: Joi.string().required(),
  isAnswer: Joi.boolean(),
});

const editAnswerSchema = Joi.object({
  content: Joi.string().required(),
  isAnswer: Joi.boolean(),
});

module.exports = {
  addAnswerSchema,
  editAnswerSchema,
};
