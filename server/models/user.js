const joi = require("joi");
const {hash, compare} = require("bcrypt");
const {sign, verify} = require("jsonwebtoken");

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

const getUserByQueryAndOptions = async (query, options) => {

  const user = await getDb().collection(collectionName).findOne(query, options);

  return user;

};

const validatePassword = async (password, hashedPassword) => {

  const result = await compare(password, hashedPassword);

  return result;

};

const generateToken = async (user) => {

  if (!user || !user._id || !user.role) {
    throw new Error("User not found");
  }

  const token = sign({
    _id: user._id,
    role: user.role
  }, process.env.JWT_SECRET, {expiresIn: "30d"});

  return token;

};

const validateToken = async (token) => {
  
  const payload = verify(token, process.env.JWT_SECRET);

  return payload;
};

module.exports = {
  userSchema,
  registerUser,
  getUserByQueryAndOptions,
  validatePassword,
  generateToken,
  validateToken
};
