// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const addQuestionSchema = Joi.object({
  question: Joi.string().required(),
  media: Joi.string(),
});

const editQuestionSchema = Joi.object({
  question: Joi.string().required(),
  media: Joi.string(),
});

module.exports = {
  addQuestionSchema,
  editQuestionSchema,
};
