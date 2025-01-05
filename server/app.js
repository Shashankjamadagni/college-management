const Express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user");
const marksRoutes = require("./routes/marks");

const {authMiddleware} = require("./middlewares/auth");

const app = Express();

var corsOptions = {
  origin: "*",
};

app.use(Express.json());

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);

app.use(authMiddleware);

app.use("/api/marks", marksRoutes);

module.exports = app;
