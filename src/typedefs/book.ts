export const bookTypedefs = `
  type Book {
    id: String!
    title: String!
  }

  type Query {
    books: [Book!]!
  }

  input AddBookInput {
    authorId: String!
    title: String!
  }

  type Mutation {
    addBook(input: AddBookInput!) : Book!
  }
`;