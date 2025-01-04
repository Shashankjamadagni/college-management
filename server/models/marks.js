const joi = require("joi");
const {objectIdValidator} = require("../utils/helpers");

const {getDb} = require("../utils/db");

const collectionName = "marks";

const marksSchema = joi.object({
  studentId: joi.custom(objectIdValidator).required(),
  addedBy: joi.custom(objectIdValidator).required(),
  marks: joi.object().required(),
  createdAt: joi.date().default(new Date()),
});

const saveMarks = async (marks) => {
  const db = getDb();
  const marksCollection = db.collection(collectionName);
  const result = await marksCollection.insertOne(marks);
  marks._id = result.insertedId;
  return marks;
};

const getMarksByQueryAndOptions = async (query, options) => {
  const db = getDb();
  const marksCollection = db.collection(collectionName);
  return marksCollection.findOne(query, options);
}

const getAllMarksByQueryAndOptions = async (query, options) => {
  const db = getDb();
  const marksCollection = db.collection(collectionName);
  return marksCollection.find(query, options).toArray();
}

module.exports = {
  marksSchema,
  saveMarks,
  getMarksByQueryAndOptions,
  getAllMarksByQueryAndOptions,
};

