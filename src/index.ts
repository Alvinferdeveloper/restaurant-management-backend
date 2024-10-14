import { ApolloServer } from '@apollo/server'; 
import { startStandaloneServer } from '@apollo/server/standalone'; 
import typeDefs from './typeDefs/index';
import { userResolvers } from './resolvers/user';
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: userResolvers,
})

await startStandaloneServer(server, { listen: { port: 3000 } });