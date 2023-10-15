// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const addCourseSchema = Joi.object({
  name: Joi.string().required(),
});

const editCourseSchema = Joi.object({
  name: Joi.string(),
});

module.exports = {
  addCourseSchema,
  editCourseSchema,
};
