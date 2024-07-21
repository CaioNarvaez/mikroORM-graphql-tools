import { orm } from "config/orm";
import { Author, Book } from "entities";
import { Resolvers } from "generated/resolvers-types";

export const bookResolver : Resolvers = {
    Query: {
        books: async () => orm.entityManager.getRepository(Book).findAll(),
    },
    Mutation: {
        addBook: async (_, { input }) => {
            const { title, authorId } = input;

            const author = await orm.entityManager.getRepository(Author).findOneOrFail({ id: authorId });

            const book = new Book({
                author,
                title
            })

            orm.entityManager.persist(book);
            await orm.entityManager.flush();

            return book;
        }
    }
}