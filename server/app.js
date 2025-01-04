const Express = require("express");

const userRoutes = require("./routes/user");

const app = Express();

app.use(Express.json());

app.use("/api/users", userRoutes);

module.exports = app;
