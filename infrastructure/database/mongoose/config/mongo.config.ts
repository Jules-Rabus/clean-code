export default class mongoConfig {
  static resolve(): string {
    const host = process.env["MONGO_HOST"] || "localhost";
    const port = parseInt(process.env["MONGO_PORT"] || "27017");
    const user = process.env["MONGO_USER"] || "root";
    const password = process.env["MONGO_PASSWORD"] || "password";
    const database = process.env["MONGO_DB"] || "app_test";

    return `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`;
  }
}
