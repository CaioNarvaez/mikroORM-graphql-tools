"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("application"));
const orm_1 = require("config/orm");
const supertest = require("supertest");
const clearDatabase_1 = require("scripts/db/clearDatabase");
const seedDatabase_1 = require("scripts/db/seedDatabase");
let request;
let application;
let em;
describe('Sample tests', async () => {
    before(async () => {
        application = new application_1.default();
        await application.connect();
        await application.init();
        em = orm_1.orm.entityManager.fork();
        request = supertest(application.host);
    });
    after(async () => {
        if (!application.server) {
            return;
        }
        application.server.close();
    });
    it('should clear database and load fixtures', async () => {
        await (0, clearDatabase_1.clearDatabase)(orm_1.orm.orm);
        await (0, seedDatabase_1.seedDatabase)(orm_1.orm.orm);
        console.log('🚀 Database cleared, fixtures loaded');
    });
});
//# sourceMappingURL=sample.test.js.map