import { EntityManager } from '@mikro-orm/postgresql';
import Application from 'application';
import { expect } from 'chai';
import { orm } from 'config/orm';
import { SuperTest, Test } from 'supertest';
import supertest = require('supertest');
import { clearDatabase } from 'scripts/db/clearDatabase';
import { seedDatabase } from 'scripts/db/seedDatabase';
import { v4 } from 'uuid';

let request: SuperTest<Test>;
let application: Application;
let em: EntityManager;

describe('Book tests', async () => {
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

  it('should get books', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `query {
          getBooks {
            id title author {
              id email
            }
            publisher {
              id name
            }
            tags {
              id name books {
                id
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.getBooks).to.be.a('array');
  });

  it('should get book by id', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `query {
          getBook(id: "${v4()}") {
            id title author {
              id email
            }
            publisher {
              id name
            }
            tags {
              id name books {
                id
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.getBook).to.be.a('object');
  });

  it('should create book', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `mutation {
          addBook (
            input: {
              title: "new Book",
            },
            authorId: "${v4()}"
            publisherId: "${v4()}"
          ) {
            id title author {
              id email
            }
            publisher {
              id name
            }
            tags {
              id name books {
                id
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.addBook).to.be.a('object');
  });

  it('should update book', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `mutation {
          updateBook (input: {
            title: "updated book",
          }, id: "${v4()}") {
            id title author {
              id email
            }
            publisher {
              id name
            }
            tags {
              id name books {
                id
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.updateBook).to.be.a('object');
  });

  it('should delete book', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `mutation {
          deleteBook (id: "${v4()}")
        }
        `,
      })
      .expect(200);

    expect(response.body.data.deleteBook).to.be.true;
  });
});
