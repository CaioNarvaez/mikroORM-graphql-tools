// Create util function to auto generate connection types

export const authorTypedef = `
  enum AuthorFilterField { 
    NAME
    EMAIL
  }

  enum AuthorOrderField {
    NAME
  }

  type Author {
    id: String!
    name: String!
    termsAccepted: Boolean!
    numberOfBooksWritten: Int!
  }

  type AuthorConnection {
    items: [Author!]!
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
    startCursor: String
    endCursor: String
  }

  input AuthorOrderBy {
    field: AuthorOrderField!
    direction: OrderByDirection!
  }

  input AuthorFilter {
    field: AuthorFilterField!
    operation: FilterOperation!
    value: String!
  }

  input AuthorFilterGroup {
    operation: FilterGroupOperator!
    filters: [AuthorFilter!]!
  }


  type Query {
    authors: [Author!]!
    authorsPaginated(after: String!, first: Int!, orderBy: [AuthorOrderBy!], filterBy: AuthorFilterGroup!): AuthorConnection!
  }
`;