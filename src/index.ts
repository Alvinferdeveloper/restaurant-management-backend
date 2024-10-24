import { ApolloServer } from '@apollo/server'; 
import { startStandaloneServer } from '@apollo/server/standalone'; 
import typeDefs from './typeDefs/index';
import { userResolvers } from './resolvers/user';
import { tableResolvers } from './resolvers/table';
import { signedUrlResolvers } from './resolvers/signedUrl';
import { foodResolvers } from './resolvers/food';

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
})

await startStandaloneServer(server, { listen: { port: 3000 } });