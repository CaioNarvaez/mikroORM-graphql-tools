import { MikroORM } from '@mikro-orm/postgresql';

export const clearDatabase = async (orm: MikroORM): Promise<void> => {
  await orm.getSchemaGenerator().dropSchema({
    dropDb: true,
    dropForeignKeys: true,
  });
  // additional sync for development
  // this way we can just create 1 migration after development
  await orm.getSchemaGenerator().updateSchema();
};
