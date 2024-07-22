import { MikroORM } from '@mikro-orm/postgresql';

export const clearDatabase = async (orm: MikroORM): Promise<void> => {
  const schemaGenerator = orm.getSchemaGenerator();
  await schemaGenerator.dropSchema({ dropForeignKeys: true });
  await schemaGenerator.updateSchema();
};
