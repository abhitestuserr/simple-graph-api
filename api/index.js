const { ApolloServer, gql } = require('apollo-server');

// Define the GraphQL schema
const typeDefs = gql`
  type Person {
    id: ID!
    name: String!
    email: String!
  }

  type Admin {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Query {
    people: [Person!]!
    admins: [Admin!]!
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    people: () => [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    ],
    admins: () => [
      { id: 1, name: 'Admin Alice', email: 'adminalice@example.com', role: 'Super Admin' },
      { id: 2, name: 'Admin Bob', email: 'adminbob@example.com', role: 'Moderator' },
    ],
  },
};

// Create the Apollo Server instance with request logging
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log('Request Headers:', req.headers);
    // You can log any other part of the request here (e.g., body, method, etc.)
    return {};
  },
  formatResponse: (response, requestContext) => {
    // Log the response if necessary
    // console.log('Response:', response);
    return response;
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
