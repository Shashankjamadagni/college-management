const {MongoClient} = require("mongodb");

const logger = require("./logger");

let db = null;

async function initializeDb() {

  const uri = process.env.MONGO_URI;

  if(!uri) throw new Error("MONGO_URI is not set");

  const client = await MongoClient.connect(
    uri,
    {
      minPoolSize: 5,
      maxPoolSize: 10,
    }
  )

  db = client.db();

  logger.info("Database initialized");

  await db.collection("users").createIndex({email: 1}, {unique: true});

  logger.info("Users index created");
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized");
  }

  return db;
}

module.exports = {
  initializeDb,
  getDb,
}
