export const bookTypedefs = `
  type Book {
    id: String!
    title: String!
  }

  type BookWithAuthor {
    title: String!
    authorName: String!
  }

  type Query {
    books: [Book!]!
    booksWithAuthor: [BookWithAuthor!]!
  }

  input AddBookInput {
    authorId: String!
    title: String!
  }

  type Mutation {
    addBook(input: AddBookInput!) : Book!
  }
`;