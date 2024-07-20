export const testTypedefs = `
  type Test {
    id: String!
  }

  type Query {
    tests: [Test!]!
  }
`;