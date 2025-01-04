const {MongoClient} = require("mongodb");

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

  console.log("Database connected");
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
