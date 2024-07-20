import { EntityManager } from '@mikro-orm/postgresql';
import Application from 'application';
import { orm } from 'orm';
import { SuperTest, Test } from 'supertest';
import supertest = require('supertest');
import { clearDatabase } from 'utils/services/clearDatabase.service';
import { loadFixtures } from 'utils/services/loadFixtures.service';

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
    await loadFixtures(orm.orm);
    console.log('🚀 Database cleared, fixtures loaded');
  });
});
