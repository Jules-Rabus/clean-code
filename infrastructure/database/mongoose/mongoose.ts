import MongooseConnection from "@app/mongoose/config/mongoose.connection";

export default class MongooseConnector {
  async connect(): Promise<void> {
    try {
      await new MongooseConnection().initialize();
    } catch (error) {
      console.error("Error connecting to the database : mongoose");
      console.error(error);
    }
  }
}
