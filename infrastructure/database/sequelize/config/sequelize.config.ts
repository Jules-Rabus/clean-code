const postgresConfiguration = {
  dialect: "postgres",
  host: process.env["POSTGRES_HOST"] || "localhost",
  port: parseInt(process.env["POSTGRES_PORT"] || "5432"),
  username: process.env["POSTGRES_USER"] || "root",
  password: process.env["POSTGRES_PASSWORD"] || "password",
  database: process.env["POSTGRES_DB"] || "app_test",
  models: [`${__dirname}/../models/*.model.ts`],
};

const modelsPath = `${__dirname}/../models/*.ts`;

const sequelizeConfigOptions = {
  dialect: postgresConfiguration.dialect,
  host: postgresConfiguration.host,
  port: postgresConfiguration.port,
  username: postgresConfiguration.username,
  password: postgresConfiguration.password,
  database: postgresConfiguration.database,
  models: [modelsPath],
};

const sequelizeConfig = {
  development: sequelizeConfigOptions,
  test: sequelizeConfigOptions,
  production: sequelizeConfigOptions,
};

export default sequelizeConfig;
