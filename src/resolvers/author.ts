import { orm } from "../config/orm";
import { Resolvers } from "../generated/resolvers-types";

export const authorResolver : Partial<Resolvers> = {
    Author: {
        termsAccepted: (parent) => Boolean(parent.termsAccepted),
        numberOfBooksWritten: (parent) => orm.authorRepository.getNumberOfBooksFromAuthorByAuthorId(parent.id)
    },
    Query: {
        authors: async () => orm.authorRepository.findAll(),
        authorsPaginated: async (_, args) => orm.authorRepository.getPaginated(args)
    },
} 