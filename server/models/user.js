const joi = require("joi");
const {hash} = require("bcrypt");

const {getDb} = require("../utils/db");

const collectionName = "users";

const userSchema = joi.object({
  fullName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  createdAt: joi.date().default(new Date()),
  updatedAt: joi.date().default(new Date()),
  role: joi.string().valid("student").default("student")
});

const registerUser = async (user) => {

  const hashedPassword = await hash(user.password, 10);

  const newUser = {
    ...user,
    password: hashedPassword
  };

  const result = await getDb().collection(collectionName).insertOne(newUser);

  newUser._id = result.insertedId;

  return newUser;

};

module.exports = {
  userSchema,
  registerUser
};
