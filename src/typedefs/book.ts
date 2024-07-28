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

  type AddBookPayloadSuccess {
    book: Book!
  }

  type AddBookPayloadProblem {
    title: String!
    description: String!
  }

  union AddBookPayload = AddBookPayloadSuccess | AddBookPayloadProblem
  

  type Mutation {
    addBook(input: AddBookInput!) : AddBookPayload!
  }
`;