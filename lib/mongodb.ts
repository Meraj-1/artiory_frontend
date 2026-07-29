// // lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

declare global {
  // allow global `var` in type scope
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
const clientPromise: Promise<MongoClient> = (() => {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri);
    globalThis._mongoClientPromise = client.connect();
  }
  return globalThis._mongoClientPromise as Promise<MongoClient>;
})();

export default clientPromise;
