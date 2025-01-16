import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true, // Enable schema introspection in production
    // Disable Apollo Sandbox and force GraphQL Playground
    playground: true,
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql", // Set the GraphQL endpoint
  });
};

startApolloServer(app, httpServer);

export default httpServer;
