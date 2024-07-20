import { EntityManager, FlushMode, MikroORM, Options, PostgreSqlDriver } from "@mikro-orm/postgresql"


export const config: Options = {
    migrations: {
      path: './src/migrations',
      tableName: 'migrations',
      transactional: true,
    },
    flushMode: FlushMode.COMMIT,
    tsNode: process.env.NODE_DEV === 'true',
    user: 'root',
    password: 'root',
    dbName: 'mikro-orm-graphql-data',
    host: 'localhost',
    port: 5432,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    driver: PostgreSqlDriver,
};
  

export const orm = {} as {
    orm: MikroORM;
    entityManager: EntityManager;
}

export async function initOrm({config, migrateDb}: { config: Options; migrateDb: boolean }) {
    orm.orm = await MikroORM.init(config);
    orm.entityManager = orm.orm.em;

    if(!migrateDb) {
        console.log('Skipping schema migrations'); 
        return;
    }

    const migrator = await orm.orm.getMigrator();
    const migrations = await migrator.getPendingMigrations();
    if (migrations && migrations.length > 0) {
        await migrator.up();
    }
}

