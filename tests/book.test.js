"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("application"));
const chai_1 = require("chai");
const orm_1 = require("config/orm");
const supertest = require("supertest");
const clearDatabase_1 = require("scripts/db/clearDatabase");
const seedDatabase_1 = require("scripts/db/seedDatabase");
const uuid_1 = require("uuid");
let request;
let application;
let em;
describe('Book tests', async () => {
    before(async () => {
        application = new application_1.default();
        await application.connect();
        await application.init();
        em = orm_1.orm.entityManager.fork();
        request = supertest(application.host);
    });
    beforeEach(async () => {
        await (0, clearDatabase_1.clearDatabase)(orm_1.orm.orm);
        await (0, seedDatabase_1.seedDatabase)(orm_1.orm.orm);
    });
    after(async () => {
        if (!application.server) {
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
        (0, chai_1.expect)(response.body.data.getBooks).to.be.a('array');
    });
    it('should get book by id', async () => {
        const response = await request
            .post('/graphql')
            .send({
            query: `query {
          getBook(id: "${(0, uuid_1.v4)()}") {
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
        (0, chai_1.expect)(response.body.data.getBook).to.be.a('object');
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
            authorId: "${(0, uuid_1.v4)()}"
            publisherId: "${(0, uuid_1.v4)()}"
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
        (0, chai_1.expect)(response.body.data.addBook).to.be.a('object');
    });
    it('should update book', async () => {
        const response = await request
            .post('/graphql')
            .send({
            query: `mutation {
          updateBook (input: {
            title: "updated book",
          }, id: "${(0, uuid_1.v4)()}") {
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
        (0, chai_1.expect)(response.body.data.updateBook).to.be.a('object');
    });
    it('should delete book', async () => {
        const response = await request
            .post('/graphql')
            .send({
            query: `mutation {
          deleteBook (id: "${(0, uuid_1.v4)()}")
        }
        `,
        })
            .expect(200);
        (0, chai_1.expect)(response.body.data.deleteBook).to.be.true;
    });
});
//# sourceMappingURL=book.test.js.map