require("dotenv").config();

const app = require("./app");

const {initializeDb} = require("./utils/db");

(async () => {

  await initializeDb();

  app.listen("3000", () => {
    console.log("Server is running on port 3000");
  });

})();
