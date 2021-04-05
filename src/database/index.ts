import { createConnection, getConnection } from 'typeorm';

import 'reflect-metadata';

class DatabaseConnection {
  public async connectToDatabase(): Promise<void> {
    await createConnection();
  }

  public async truncateDatabase(): Promise<void> {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    const entityDeletionPromises = entities.map(entity => async () => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });

    await Promise.all(entityDeletionPromises);
  }

  public async disconnectToDatabase(): Promise<void> {
    await getConnection().close();
  }
}

export default new DatabaseConnection();
