import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { userDefs } from "./typeDefs/user.js";
import { userResolvers } from "./resolvers/user.js";
const server = new ApolloServer({
  typeDefs: userDefs,
  resolvers: userResolvers
});
await startStandaloneServer(server, {
  listen: {
    port: 3000
  }
});