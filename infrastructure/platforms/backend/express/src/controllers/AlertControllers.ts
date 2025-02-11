import { Request, Response } from "express";

import FindAllAlertUseCase from "@app/application/useCases/alerts/FindAllAlertUseCase";
import FindOneAlertUseCase from "@app/application/useCases/alerts/FindOneAlertUseCase";
import MongooseAlertRepository from "@app/mongoose/repositories/Alert";

export class AlertController {
  private readonly FindAllAlertUseCase: FindAllAlertUseCase;
  private readonly FindOneAlertUseCase: FindOneAlertUseCase;

  constructor() {
    const alertRepository = new MongooseAlertRepository();
    this.FindAllAlertUseCase = new FindAllAlertUseCase(alertRepository);
    this.FindOneAlertUseCase = new FindOneAlertUseCase(alertRepository);
  }

  async findAll(res: Response) {
    try {
      const alerts = await this.FindAllAlertUseCase.execute();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alert = await this.FindOneAlertUseCase.execute(id);
      res.json(alert);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
