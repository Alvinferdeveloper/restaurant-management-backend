import { ApolloServer } from '@apollo/server'; 
import { startStandaloneServer } from '@apollo/server/standalone'; 
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import typeDefs from './typeDefs/index';
import express from 'express';
import http from 'http'
import { userResolvers } from './resolvers/user';
import { tableResolvers } from './resolvers/table';
import { signedUrlResolvers } from './resolvers/signedUrl';
import { foodResolvers } from './resolvers/food';

const app = express();
const httpServer = http.createServer(app);

const resolvers = {
    Query: {
      ...userResolvers.Query,
      ...tableResolvers.Query,
      ...foodResolvers.Query
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...tableResolvers.Mutation,
      ...signedUrlResolvers.Mutation,
      ...foodResolvers.Mutation,
    },
  };
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})


await server.start();

app.use(
  '/',
  express.json(),
  expressMiddleware(server),
);


await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);
console.log(`🚀 Server ready at http://localhost:4000/`);