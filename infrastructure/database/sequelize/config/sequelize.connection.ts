import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import sequelizeConfig from '@app/sequelize/config/sequelize.config';

export default class SequelizeConnection {
  private readonly appEnvironment = process.env['NODE_ENV'] || 'development';

  async initialize(): Promise<Sequelize> {
    type AppEnvironment = 'development' | 'test' | 'production';

    const sequelizeConfigOptionsTyped = sequelizeConfig[
      this.appEnvironment as AppEnvironment
    ] as SequelizeOptions;

    const SequelizeConnection = new Sequelize(sequelizeConfigOptionsTyped);

    await SequelizeConnection.sync({
      alter: true,
      force: false,
    }).then(() => {
      console.log('Sequelize models synced');
    })
    .catch((error) => {
      console.error('Error syncing Sequelize models');
      console.error(error);
    }); 

    return SequelizeConnection;
  }
}