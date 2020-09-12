import express from 'express'
import { merge } from 'lodash'
import { ApolloServer, gql } from 'apollo-server-express'


const server = new ApolloServer({ 
	typeDefs: [schQuery, schMutation, schRecipe, schUser], 
	resolvers: merge(resUser, resRecipe)
});
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
