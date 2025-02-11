import { Request, Response } from "express";
import SequelizePartRepository from "@app/sequelize/repositories/Part";
import CreatePartUseCase from "@app/application/useCases/parts/CreatePartUseCase";
import FindAllPartsUseCase from "@app/application/useCases/parts/FindAllPartUseCase";
import FindOnePartUseCase from "@app/application/useCases/parts/FindOnePartUseCase";
import UpdatePartUseCase from "@app/application/useCases/parts/UpdatePartUseCase";
import RemovePartUseCase from "@app/application/useCases/parts/RemovePartUseCase";

import CreateAlertUseCase from "@app/application/useCases/alerts/CreateAlertUseCase";
import MongooseAlertRepository from "@app/mongoose/repositories/Alert";

export class PartsController {
  private createPartUseCase: CreatePartUseCase;
  private findAllPartsUseCase: FindAllPartsUseCase;
  private findOnePartUseCase: FindOnePartUseCase;
  private updatePartUseCase: UpdatePartUseCase;
  private removePartUseCase: RemovePartUseCase;

  constructor() {
    const partsRepository = new SequelizePartRepository();
    this.createPartUseCase = new CreatePartUseCase(partsRepository);
    this.findAllPartsUseCase = new FindAllPartsUseCase(partsRepository);
    this.findOnePartUseCase = new FindOnePartUseCase(partsRepository);
    this.updatePartUseCase = new UpdatePartUseCase(
      partsRepository,
      new CreateAlertUseCase(new MongooseAlertRepository()),
    );
    this.removePartUseCase = new RemovePartUseCase(partsRepository);
  }

  async createPart(req: Request, res: Response): Promise<void> {
    try {
      const part = await this.createPartUseCase.execute(req.body);
      res.status(201).json(part);
    } catch (error) {
      console.error("Erreur dans PartsController.createPart:", error);
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  async getParts(res: Response): Promise<void> {
    try {
      const parts = await this.findAllPartsUseCase.execute();
      res.json(parts);
    } catch (error) {
      console.error("Erreur dans PartsController.getParts:", error);
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  async getPart(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const part = await this.findOnePartUseCase.execute(id);
      if (!part) {
        res.status(404).json({ error: "Pièce non trouvée" });
      } else {
        res.json(part);
      }
    } catch (error) {
      console.error("Erreur dans PartsController.getPart:", error);
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  async updatePart(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updated = await this.updatePartUseCase.execute(id, req.body);
      if (!updated) {
        res.status(404).json({ error: "Pièce non trouvée" });
      } else {
        res.json(updated);
      }
    } catch (error) {
      console.error("Erreur dans PartsController.updatePart:", error);
      res.status(500).json({ error: "Erreur interne" });
    }
  }

  async removePart(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const removed = await this.removePartUseCase.execute(id);
      if (!removed) {
        res.status(404).json({ error: "Pièce non trouvée" });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error("Erreur dans PartsController.removePart:", error);
      res.status(500).json({ error: "Erreur interne" });
    }
  }
}
