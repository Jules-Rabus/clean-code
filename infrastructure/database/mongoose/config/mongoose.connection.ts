import mongoose from "mongoose";

import mongoConfig from "./mongo.config";

export default class MongooseConnection {
  async initialize(): Promise<void> {
    console.log("Initializing Mongoose connection...");
    try {
      await mongoose.connect(mongoConfig.resolve());
      console.log("Mongoose connection initialized");
    } catch (error) {
      console.error("Error initializing Mongoose connection:", error);
      throw error;
    }
  }
}
