"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest = require("supertest");
const clearDatabase_1 = require("scripts/db/clearDatabase");
const seedDatabase_1 = require("scripts/db/seedDatabase");
const application_1 = __importDefault(require("application"));
const orm_1 = require("config/orm");
const uuid_1 = require("uuid");
let request;
let application;
let em;
describe('Author tests', async () => {
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
        (0, chai_1.expect)(response.body.data.getAuthors).to.be.a('array');
    });
    it('should get author by id', async () => {
        const response = await request
            .post('/graphql')
            .send({
            query: `query {
          getAuthor(id: "${(0, uuid_1.v4)()}") {
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
        (0, chai_1.expect)(response.body.data.getAuthor).to.be.a('object');
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
        (0, chai_1.expect)(response.body.data.addAuthor).to.be.a('object');
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
          }, id: "${(0, uuid_1.v4)()}") {
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
        (0, chai_1.expect)(response.body.data.updateAuthor).to.be.a('object');
    });
    it('should delete author', async () => {
        const response = await request
            .post('/graphql')
            .send({
            query: `mutation {
          deleteAuthor (id: "${(0, uuid_1.v4)()}")
        }
        `,
        })
            .expect(200);
        (0, chai_1.expect)(response.body.data.deleteAuthor).to.be.true;
    });
});
//# sourceMappingURL=author.test.js.map