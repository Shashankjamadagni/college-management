require("dotenv").config();

const app = require("./app");

const logger = require("./utils/logger");

const {initializeDb} = require("./utils/db");

(async () => {

  try {

    await initializeDb();

    app.listen("3000", () => {
      logger.info("Server started on port 3000");
    });

  } catch (error) {

    logger.error(error.message);

  }

})();
