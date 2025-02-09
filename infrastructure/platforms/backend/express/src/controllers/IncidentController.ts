import { Request, Response } from "express";
import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";
import CreateIncidentUseCase from "@app/application/useCases/Incidents/CreateIncidentUseCase";
import FindAllIncidentUseCase from "@app/application/useCases/Incidents/FindAllIncidentUseCase";
import FindOneIncidentUseCase from "@app/application/useCases/Incidents/FindOneIncidentUseCase";
import UpdateIncidentUseCase from "@app/application/useCases/Incidents/UpdateIncidentUseCase";
import RemoveIncidentUseCase from "@app/application/useCases/Incidents/RemoveIncidentUseCase";
import SearchByBikeUseCase from "@app/application/useCases/Incidents/SearchByBikeUseCase";

export class IncidentController {
    private createIncidentUseCase: CreateIncidentUseCase;
    private findAllIncidentsUseCase: FindAllIncidentUseCase;
    private findOneIncidentUseCase: FindOneIncidentUseCase;
    private updateIncidentUseCase: UpdateIncidentUseCase;
    private removeIncidentUseCase: RemoveIncidentUseCase;
    private SearchByBikeUseCase: SearchByBikeUseCase;

    constructor() {
        const incidentsRepository = new SequelizeIncidentRepository();
        this.createIncidentUseCase = new CreateIncidentUseCase(incidentsRepository);
        this.findAllIncidentsUseCase = new FindAllIncidentUseCase(incidentsRepository);
        this.findOneIncidentUseCase = new FindOneIncidentUseCase(incidentsRepository);
        this.updateIncidentUseCase = new UpdateIncidentUseCase(incidentsRepository);
        this.removeIncidentUseCase = new RemoveIncidentUseCase(incidentsRepository);
        this.SearchByBikeUseCase = new SearchByBikeUseCase(incidentsRepository);
    }

    async createIncident(req: Request, res: Response): Promise<void> {
        try {
            const incident = await this.createIncidentUseCase.execute(req.body);
            res.status(201).json(incident);
        } catch (error) {
            console.error("Erreur dans IncidentController.createIncident:", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }

    async getIncidents(req: Request, res: Response): Promise<void> {
        try {
            const incidents = await this.findAllIncidentsUseCase.execute();
            res.json(incidents);
        } catch (error) {
            console.error("Erreur dans IncidentController.getIncidents:", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }

    async getIncident(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const incident = await this.findOneIncidentUseCase.execute(id);
            if (!incident) {
                res.status(404).json({ error: "Incident non trouvé" });
            } else {
                res.json(incident);
            }
        } catch (error) {
            console.error("Erreur dans IncidentController.getIncident:", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }

    async updateIncident(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updated = await this.updateIncidentUseCase.execute(id, req.body);
            if (!updated) {
                res.status(404).json({ error: "Incident non trouvé" });
            } else {
                res.json(updated);
            }
        } catch (error) {
            console.error("Erreur dans IncidentController.updateIncident:", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }

    async removeIncident(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const removed = await this.removeIncidentUseCase.execute(id);
            if (!removed) {
                res.status(404).json({ error: "Incident non trouvé" });
            } else {
                res.status(204).send();
            }
        } catch (error) {
            console.error("Erreur dans IncidentController.removeIncident:", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }

    async getIncidentsByBike(req: Request, res: Response): Promise<void> {
        try {
            const { bikeId } = req.params;
            const incidents = await this.SearchByBikeUseCase.execute(bikeId);
            res.json(incidents);
        } catch (error) {
            console.error("Erreur dans IncidentController.getIncidentsByBike:", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }
}
