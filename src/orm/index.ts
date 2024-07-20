import { EntityManager, MikroORM, Options } from "@mikro-orm/postgresql"

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