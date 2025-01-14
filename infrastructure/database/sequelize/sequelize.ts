import SequelizeConnection from '@app/sequelize/config/sequelize.connection';

export default class SequelizeConnector {
  async connect(): Promise<void> {
    try{
      await new SequelizeConnection().initialize();
    }
    catch(error){
      console.error('Error connecting to the database : sequelize');
      throw error;
    }
  }
}