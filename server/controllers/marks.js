const {marksSchema, saveMarks, getAllMarksByQueryAndOptions} = require("../models/marks");

async function saveMarksController(req, res) {

  const {error, value} = marksSchema.validate({
    ...req.body,
    addedBy: req.user._id,
  });
  if (error) {
    return res.status(400).json({error: error.message});
  }
  const marks = await saveMarks(value);
  res.status(201).json(marks);
}

async function getMyMarksController(req, res) {
  const query = {studentId: req.user._id};
  const marks = await getAllMarksByQueryAndOptions(query);
  res.json(marks);
}

module.exports = {
  saveMarksController,
  getMyMarksController,
}
