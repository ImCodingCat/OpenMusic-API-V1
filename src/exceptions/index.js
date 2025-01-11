const InternalError = require('./InternalError');
const NotFoundError = require('./NotFoundError');
const ValidationError = require('./ValidationError');
const RequestError = require('./BaseError');

module.exports = {
  InternalError, NotFoundError, ValidationError, RequestError,
};
