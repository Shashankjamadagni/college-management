const router = require("express").Router();
const marksControllers = require("../controllers/marks");
const { adminOrTeacherMiddleware } = require("../middlewares/auth");

router.post("/v1", adminOrTeacherMiddleware, marksControllers.saveMarksController);
router.get("/v1", marksControllers.getMyMarksController);

module.exports = router;
