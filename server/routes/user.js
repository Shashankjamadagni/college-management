const router = require('express').Router();

const userControllers = require("../controllers/user");

const {authMiddleware, adminOnlyMiddleware} = require("../middlewares/auth");

router.post("/v1/register", authMiddleware, adminOnlyMiddleware, userControllers.registerUserController);
router.post("/v1/login", userControllers.loginUserController);

module.exports = router;
