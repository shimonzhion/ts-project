const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: passwordComplexity().required(),
  phone: Joi.string().optional(),
  image: Joi.string().optional(),
  birthdate: Joi.date().optional(),
});

// Validate data againt Joi schema
const validateUser = (data) => {
  return userJoiSchema.validate(data);
};

module.exports = { validateUser };
