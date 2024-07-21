import { orm } from "config/orm";
import { Book } from "entities";
import { Resolvers } from "generated/resolvers-types";

export const bookResolver : Partial<Resolvers> = {
    Query: {
        books: async () => orm.entityManager.getRepository(Book).findAll(),
    },
}