import Alert from "@app/domain/entities/alert";
import AlertRepository from "@app/domain/repositories/AlertsRepository";
import { AlertModel } from "../models/Alert";
import AlertNotFoundError from "@app/domain/errors/alerts/AlertNotFoundError";
import SequelizePartRepository from "@app/sequelize/repositories/Part";

export default class MongooseAlertRepository implements AlertRepository {
  public async create(alert: Alert): Promise<Alert> {
    const newAlert = await AlertModel.create(alert);

    return Alert.fromMongoModel(newAlert, new SequelizePartRepository());
  }

  public async update(
    identifier: string,
    alert: Partial<Alert>,
  ): Promise<Alert | AlertNotFoundError> {
    const updatedAlert = await AlertModel.findByIdAndUpdate(identifier, alert, {
      new: true,
    }); // @TODO : check identifier

    if (!updatedAlert) {
      return new AlertNotFoundError();
    }

    return Alert.fromMongoModel(updatedAlert, new SequelizePartRepository());
  }

  public async findOne(
    identifier: string,
  ): Promise<Alert | AlertNotFoundError> {
    const alert = await AlertModel.findOne({ identifier });

    if (!alert) {
      return new AlertNotFoundError();
    }

    return Alert.fromMongoModel(alert, new SequelizePartRepository());
  }

  public async findAll(): Promise<Alert[]> {
    const alerts = await AlertModel.find();
    return await Promise.all(
      alerts.map(async (alert) =>
        Alert.fromMongoModel(alert, new SequelizePartRepository()),
      ),
    );
  }

  public async searchByPart(partId: string): Promise<Alert[]> {
    const alerts = await AlertModel.find({ part: { $eq: partId } });
    return await Promise.all(
      alerts.map(async (alert) =>
        Alert.fromMongoModel(alert, new SequelizePartRepository()),
      ),
    );
  }
}
