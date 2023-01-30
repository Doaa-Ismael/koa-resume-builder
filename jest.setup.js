import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  global.__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf("/"));
  await mongoose.connect(`${process.env.MONGO_URI}/testDB`);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}

export default globalSetup;
