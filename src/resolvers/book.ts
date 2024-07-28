import { orm } from "config/orm";
import { Author, Book } from "entities";
import { BookWithAuthorVirtual } from "entities/virtuals";
import { Resolvers } from "generated/resolvers-types";

export const bookResolver : Resolvers = {
    Query: {
        books: () => orm.entityManager.getRepository(Book).findAll(),
        booksWithAuthor: async () => orm.entityManager.find(BookWithAuthorVirtual, {}),
    },
    Mutation: {
        addBook: async (_, { input }) => {
            const { title, authorId } = input;
            const author = await orm.entityManager.getRepository(Author).findOne({ id: authorId });
            if(!author) {
                return {
                    title: 'Author not found',
                    description: `Author with id: ${authorId} does not exist in the database.`
                }
            }
            const book = new Book({
                author,
                title
            })
            orm.entityManager.persist(book);
            await orm.entityManager.flush();
            return { book };
        }
    },
    AddBookPayload: {
        __resolveType(obj) {
          if (obj.__typename === 'AddBookPayloadSuccess') {
            return 'AddBookPayloadSuccess';
          }
          return 'AddBookPayloadProblem';
        },
    },
}