const router = require('express').Router();

const userControllers = require("../controllers/user");

router.post("/v1/register", userControllers.registerUserController);
router.post("/v1/login", userControllers.loginUserController);

module.exports = router;
