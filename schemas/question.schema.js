// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const addQuestionSchema = Joi.object({
  question: Joi.string().required(),
  answer_a: Joi.string().required(),
  answer_b: Joi.string().required(),
  answer_c: Joi.string().required(),
  answer_d: Joi.string().required(),
  correct_answer: Joi.string().required(),
  media: Joi.string(),
});

const editQuestionSchema = Joi.object({
  question: Joi.string().required(),
  answer_a: Joi.string().required(),
  answer_b: Joi.string().required(),
  answer_c: Joi.string().required(),
  answer_d: Joi.string().required(),
  correct_answer: Joi.string().required(),
  media: Joi.string(),
});

module.exports = {
  addQuestionSchema,
  editQuestionSchema,
};
