export const bookTypedefs = `
  type Book {
    id: String!
    title: String!
  }

  type Query {
    books: [Book!]!
  }
`;