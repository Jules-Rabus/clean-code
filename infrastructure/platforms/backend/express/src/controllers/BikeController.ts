import { Request, Response } from "express";
import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import CreateBikeUseCase from "@app/application/useCases/Bikes/CreateBikeUseCase";
import FindAllBikeUseCase from "@app/application/useCases/Bikes/FindAllBikeUseCase";
import FindOneBikeUseCase from "@app/application/useCases/Bikes/FindOneBikeUseCase";
import UpdateBikeUseCase from "@app/application/useCases/Bikes/UpdateBikeUseCase";
import RemoveBikeUseCase from "@app/application/useCases/Bikes/RemoveBikeUseCase";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";

export class BikeController {
    private createBikeUseCase: CreateBikeUseCase;
    private findAllBikeUseCase: FindAllBikeUseCase;
    private findOneBikeUseCase: FindOneBikeUseCase;
    private updateBikeUseCase: UpdateBikeUseCase;
    private removeBikeUseCase: RemoveBikeUseCase;

    constructor() {
        const bikesRepository = new SequelizeBikeRepository();
        this.createBikeUseCase = new CreateBikeUseCase(bikesRepository);
        this.findAllBikeUseCase = new FindAllBikeUseCase(bikesRepository);
        this.findOneBikeUseCase = new FindOneBikeUseCase(bikesRepository);
        this.updateBikeUseCase = new UpdateBikeUseCase(bikesRepository);
        this.removeBikeUseCase = new RemoveBikeUseCase(bikesRepository);
    }

    async getBikes(req: Request, res: Response): Promise<void> {
        try {
            const bikes = await this.findAllBikeUseCase.execute();
            res.json(bikes);
        } catch (error) {
            console.error("Erreur dans BikeController.getBikes :", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }

    async getBike(req: Request, res: Response): Promise<void> {
        try {
            const { vin } = req.params;
            const bike = await this.findOneBikeUseCase.execute(new VinIdentifier(vin));
            if (!bike) {
                res.status(404).json({ error: "Moto non trouvée" });
            } else {
                res.json(bike);
            }
        } catch (error) {
            console.error("Erreur dans BikeController.getBike :", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }

    async createBike(req: Request, res: Response): Promise<void> {
        try {
            const bikeData = req.body;
            const bike = await this.createBikeUseCase.execute(bikeData);
            res.status(201).json(bike);
        } catch (error) {
            console.error("Erreur dans BikeController.createBike :", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }

    async updateBike(req: Request, res: Response): Promise<void> {
        try {
            const { vin } = req.params;
            const bikeData = req.body;
            const bike = await this.updateBikeUseCase.execute(new VinIdentifier(vin), bikeData);
            if (!bike) {
                res.status(404).json({ error: "Moto non trouvée" });
            } else {
                res.json(bike);
            }
        } catch (error) {
            console.error("Erreur dans BikeController.updateBike :", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }

    async removeBike(req: Request, res: Response): Promise<void> {
        try {
            const { vin } = req.params;
            const success = await this.removeBikeUseCase.execute(new VinIdentifier(vin));
            if (!success) {
                res.status(404).json({ error: "Moto non trouvée" });
            } else {
                res.status(204).send();
            }
        } catch (error) {
            console.error("Erreur dans BikeController.removeBike :", error);
            res.status(500).json({ error: "Erreur interne" });
        }
    }
}
