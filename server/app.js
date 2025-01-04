const Express = require("express");

const userRoutes = require("./routes/user");
const marksRoutes = require("./routes/marks");

const {authMiddleware} = require("./middlewares/auth");

const app = Express();

app.use(Express.json());

app.use("/api/users", userRoutes);

app.use(authMiddleware);

app.use("/api/marks", marksRoutes);

module.exports = app;
