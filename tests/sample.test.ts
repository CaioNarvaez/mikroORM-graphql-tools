import { EntityManager } from '@mikro-orm/postgresql';
import Application from 'application';
import { orm } from 'config/orm';
import { SuperTest, Test } from 'supertest';
import supertest = require('supertest');
import { clearDatabase } from 'scripts/db/clearDatabase';
import { seedDatabase } from 'scripts/db/seedDatabase';

let request: SuperTest<Test>;
let application: Application;
let em: EntityManager;

describe('Sample tests', async () => {
  before(async () => {
    application = new Application();
    await application.connect();
    await application.init();

    em = orm.entityManager.fork();

    request = supertest(application.host);
  });

  after(async () => {
    if(!application.server) {
      return;
    }
    application.server.close();
  });

  it('should clear database and load fixtures', async () => {
    await clearDatabase(orm.orm);
    await seedDatabase(orm.orm);
    console.log('🚀 Database cleared, fixtures loaded');
  });
});
