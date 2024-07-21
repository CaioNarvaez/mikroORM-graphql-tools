import { EntityManager } from '@mikro-orm/postgresql';
import { expect } from 'chai';
import { SuperTest, Test } from 'supertest';
import supertest = require('supertest');
import { clearDatabase } from 'scripts/db/clearDatabase';
import { seedDatabase } from 'scripts/db/seedDatabase';

import Application from 'application';
import { orm } from 'config/orm';
import { v4 } from 'uuid';

let request: SuperTest<Test>;
let application: Application;
let em: EntityManager;

describe('Author tests', async () => {
  before(async () => {
    application = new Application();
    await application.connect();
    await application.init();

    em = orm.entityManager.fork();

    request = supertest(application.host);
  });

  beforeEach(async () => {
    await clearDatabase(orm.orm);
    await seedDatabase(orm.orm);
  });

  after(async () => {
    if(!application.server) {
      return;
    }
    application.server.close();
  });

  it('should get authors', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `query {
          getAuthors {
            id name email born
            books {
              id title
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.getAuthors).to.be.a('array');
  });

  it('should get author by id', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `query {
          getAuthor(id: "${v4()}") {
            id name born email
            books {
              id title tags {
                id name
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.getAuthor).to.be.a('object');
  });

  it('should create author', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `mutation {
          addAuthor (
            input: {
              email: "email@email.com",
              name: "new author",
              born: "${new Date(new Date().setFullYear(1994)).toISOString()}"
            }
          ) {
            id name born email
            books {
              id title tags {
                id name
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.addAuthor).to.be.a('object');
  });

  it('should update author', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `mutation {
          updateAuthor (input: {
            email: "updated@email.com",
            name: "update name",
            born: "${new Date().toISOString()}"
          }, id: "${v4()}") {
            id name born email
            books {
              id title tags {
                id name
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.updateAuthor).to.be.a('object');
  });

  it('should delete author', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `mutation {
          deleteAuthor (id: "${v4()}")
        }
        `,
      })
      .expect(200);

    expect(response.body.data.deleteAuthor).to.be.true;
  });
});
