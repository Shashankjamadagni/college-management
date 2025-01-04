const Express = require("express");

const app = Express();

app.use(Express.json());

module.exports = app;
