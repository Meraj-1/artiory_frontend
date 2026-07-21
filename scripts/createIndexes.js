// scripts/createIndexes.js
import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Set MONGODB_URI in .env");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(); // uses default DB in connection string
    console.log("Creating unique index on users.email ...");
    const result = await db.collection("users").createIndex({ email: 1 }, { unique: true });
    console.log("Index created:", result);
  } catch (err) {
    console.error("Index creation failed:", err);
  } finally {
    await client.close();
  }
}

main();
