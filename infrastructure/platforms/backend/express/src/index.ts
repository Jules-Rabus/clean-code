import express, { Request, Response } from "express";
import cors from "cors";
import bikeRoutes from "@app/express/src/routes/bike.routes";
import userRoutes from "@app/express/src/routes/user.routes";
import incidentRoutes from "@app/express/src/routes/incident.routes";
import maintenanceRoutes from "@app/express/src/routes/maintenance.routes";
import partsRoutes from "@app/express/src/routes/parts.routes";
import authRoutes from "@app/express/src/routes/auth.routes";
import alertRouter from "@app/express/src/routes/alert.routes";

import SequelizeConnector from "@app/sequelize/sequelize";
import MongooseConnector from "@app/mongoose/mongoose";

const app = express();
const port = process.env["PORT"] || 3000;

app.use(cors());

app.use(express.json());

app.use("/bikes", bikeRoutes);
app.use("/users", userRoutes);
app.use("/incidents", incidentRoutes);
app.use("/maintenances", maintenanceRoutes);
app.use("/parts", partsRoutes);
app.use("/auth", authRoutes);
app.use("/alerts", alertRouter);

async function start(): Promise<void> {
  try {
    const sequelizeConnector = new SequelizeConnector();
    await sequelizeConnector.connect();

    const mongooseConnector = new MongooseConnector();
    await mongooseConnector.connect();
  } catch (error) {
    console.error("Error while initializing database:", error);
  }
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

start();
