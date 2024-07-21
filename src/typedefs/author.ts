export const authorTypedef = `
  type Author {
    id: String!
    name: String!
    email: String!
    termsAccepted: Boolean!
  }

  type Query {
    authors: [Author!]!
  }
`;