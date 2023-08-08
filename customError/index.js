const CustomError = require('./CustomError')
const Unauthenticated = require('./unauthenticated')
const BadRequest = require('./badRequest')
const NotFound = require("./notFound")
const Unauthorized = require('./unauthorised');

module.exports = {
  CustomError,
  Unauthenticated,
  BadRequest,
  NotFound,
  Unauthorized
}
