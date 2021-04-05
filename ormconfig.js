if (process.env.NODE_ENV === 'test') {
  module.exports = {
    type: 'sqlite',
    database: 'src/database/sqlite/database.sqlite',
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/database/entities/*.entity.ts'],
    logging: false,
    synchronize: false,
    migrationsRun: true,
    cli: {
      migrationsDir: ['src/database/migrations'],
      entitiesDir: ['src/database/entities'],
    },
  };
} else {
  module.exports = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    reconnectTries: 3,
    migrationsRun: true,
    entities: ['src/database/entities/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };
}
