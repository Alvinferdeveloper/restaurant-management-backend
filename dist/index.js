import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "./typeDefs/index.js";
import { userResolvers } from "./resolvers/user.js";
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: userResolvers
});
await startStandaloneServer(server, {
  listen: {
    port: 3000
  }
});