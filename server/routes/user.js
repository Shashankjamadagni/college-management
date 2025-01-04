const router = require('express').Router();

const userControllers = require("../controllers/user");

router.post("/v1/register", userControllers.registerUserController);

module.exports = router;
