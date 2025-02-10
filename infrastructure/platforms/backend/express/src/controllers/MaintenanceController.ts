import { Request, Response } from "express";
import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";
import CreateMaintenanceUseCase from "@app/application/useCases/maintenances/CreateMaintenanceUseCase";
import FindAllMaintenanceUseCase from "@app/application/useCases/maintenances/FindAllMaintenanceUseCase";
import FindOneMaintenanceUseCase from "@app/application/useCases/maintenances/FindOneMaintenanceUseCase";
import UpdateMaintenanceUseCase from "@app/application/useCases/maintenances/UpdateMaintenanceUseCase";
import RemoveMaintenanceUseCase from "@app/application/useCases/maintenances/RemoveMaintenanceUseCase";
import SearchByBikeUseCase from "@app/application/useCases/maintenances/SearchByBikeUseCase";
//import SearchByTechnicianIdUseCase from "@app/application/useCases/maintenances/SearchByTechnicianIdUseCase";

export class MaintenanceController {
  private createMaintenanceUseCase: CreateMaintenanceUseCase;
  private findAllMaintenanceUseCase: FindAllMaintenanceUseCase;
  private findOneMaintenanceUseCase: FindOneMaintenanceUseCase;
  private updateMaintenanceUseCase: UpdateMaintenanceUseCase;
  private removeMaintenanceUseCase: RemoveMaintenanceUseCase;
  private SearchByBikeUseCase: SearchByBikeUseCase;
  //private findByTechnicianIdUseCase: FindMaintenanceByTechnicianIdUseCase; @TODO: Fix this

  constructor() {
    const repo = new SequelizeMaintenanceRepository();
    this.createMaintenanceUseCase = new CreateMaintenanceUseCase(repo);
    this.findAllMaintenanceUseCase = new FindAllMaintenanceUseCase(repo);
    this.findOneMaintenanceUseCase = new FindOneMaintenanceUseCase(repo);
    this.updateMaintenanceUseCase = new UpdateMaintenanceUseCase(repo);
    this.removeMaintenanceUseCase = new RemoveMaintenanceUseCase(repo);
    this.SearchByBikeUseCase = new SearchByBikeUseCase(repo);
    //this.findByTechnicianIdUseCase = new FindMaintenanceByTechnicianIdUseCase(repo);
  }

  async createMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const maintenance = await this.createMaintenanceUseCase.execute(req.body);
      res.status(201).json();
    } catch (error) {
      console.error(
        "Erreur dans MaintenanceController.createMaintenance:",
        error,
      );
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  async getAllMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const s = await this.findAllMaintenanceUseCase.execute();
      res.json(s);
    } catch (error) {
      console.error(
        "Erreur dans MaintenanceController.getAllMaintenance:",
        error,
      );
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  async getMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const maintenance = await this.findOneMaintenanceUseCase.execute(id);
      if (!maintenance) {
        res.status(404).json({ error: " de maintenance non trouvé" });
      } else {
        res.json();
      }
    } catch (error) {
      console.error("Erreur dans MaintenanceController.getMaintenance:", error);
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  async updateMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updated = await this.updateMaintenanceUseCase.execute(id, req.body);
      if (!updated) {
        res.status(404).json({ error: " de maintenance non trouvé" });
      } else {
        res.json(updated);
      }
    } catch (error) {
      console.error(
        "Erreur dans MaintenanceController.updateMaintenance:",
        error,
      );
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  async removeMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const removed = await this.removeMaintenanceUseCase.execute(id);
      if (!removed) {
        res.status(404).json({ error: " de maintenance non trouvé" });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error(
        "Erreur dans MaintenanceController.removeMaintenance:",
        error,
      );
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  async getMaintenanceByBike(req: Request, res: Response): Promise<void> {
    try {
      const { bikeId } = req.params;
      const s = await this.SearchByBikeUseCase.execute(bikeId);
      res.json(s);
    } catch (error) {
      console.error(
        "Erreur dans MaintenanceController.getMaintenanceByBike:",
        error,
      );
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  /*async getMaintenanceByTechnician(req: Request, res: Response): Promise<void> {
        try {
            const { technicianId } = req.params;
            const s = await this.findByTechnicianIdUseCase.execute(technicianId);
            res.json(s);
        } catch (error) {
            console.error("Erreur dans MaintenanceController.getMaintenanceByTechnician:", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    } @ TODO */
}
