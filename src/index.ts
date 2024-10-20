import { ApolloServer } from '@apollo/server'; 
import { startStandaloneServer } from '@apollo/server/standalone'; 
import typeDefs from './typeDefs/index';
import { userResolvers } from './resolvers/user';
import { tableResolvers } from './resolvers/table';
import { signedUrlResolvers } from './resolvers/signedUrl';

const resolvers = {
    Query: {
      ...userResolvers.Query,
      ...tableResolvers.Query,
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...tableResolvers.Mutation,
      ...signedUrlResolvers.Mutation
    },
  };
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

await startStandaloneServer(server, { listen: { port: 3000 } });