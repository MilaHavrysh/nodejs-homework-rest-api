const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(10).max(13).required(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().min(10).max(13).optional(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports.validateCreateContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};
module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
module.exports.validateUpdateStatus = (req, _res, next) => {
  return validate(schemaUpdateStatus, req.body, next);
};
