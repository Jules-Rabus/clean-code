// src/routes/incident.routes.ts
import { Router } from "express";
import { IncidentController } from "../controllers/IncidentController";

const router = Router();
const incidentController = new IncidentController();

router.post("/", (req, res) => incidentController.createIncident(req, res));

router.get("/", (req, res) => incidentController.getIncidents(req, res));

router.get("/:id", (req, res) => incidentController.getIncident(req, res));

router.put("/:id", (req, res) => incidentController.updateIncident(req, res));

router.delete("/:id", (req, res) =>
  incidentController.removeIncident(req, res),
);

router.get("/bike/:bikeId", (req, res) =>
  incidentController.getIncidentsByBike(req, res),
);

export default router;
