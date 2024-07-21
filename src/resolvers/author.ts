import { orm } from "config/orm";
import { Author } from "entities";
import { Resolvers } from "generated/resolvers-types";

export const authorResolver : Partial<Resolvers> = {
    Author: {
        termsAccepted: (parent) => Boolean(parent.termsAccepted),
    },
    Query: {
        authors: async () => orm.entityManager.getRepository(Author).findAll(),
    },
}