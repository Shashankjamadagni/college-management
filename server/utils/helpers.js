const {ObjectId} = require("mongodb");

const objectIdValidator = (value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }

  return value;
}

module.exports = {
  objectIdValidator,
}
