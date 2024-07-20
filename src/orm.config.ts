import { FlushMode, Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

export default {
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
} as Options;
