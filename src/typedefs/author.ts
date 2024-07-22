export const authorTypedef = `
  type Author {
    id: String!
    name: String!
    termsAccepted: Boolean!
    numberOfBooksWritten: Int!
  }

  type Query {
    authors: [Author!]!
  }
`;