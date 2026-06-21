const ApiError = require('../utils/ApiError');

module.exports = (schema, where = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[where], { abortEarly: false, stripUnknown: true });
  if (error) return next(new ApiError(400, 'Validation failed', error.details.map(d => d.message)));
  req[where] = value;
  next();
};
