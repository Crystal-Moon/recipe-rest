import express from 'express'
import { merge } from 'lodash'
import { ApolloServer, gql } from 'apollo-server-express'
require('dotenv').config();

// -- database
import { createConnection } from 'typeorm'
import { User } from './entity/User'
import { Recipe } from './entity/Recipe'
import { Category } from './entity/Category'
import { Ingredient } from './entity/Ingredient'

// -- schemas
import schQuery from './schemas/query'
import schMutation from './schemas/mutation'
import schUser from './schemas/user'
import schRecipe from './schemas/recipe'

// -- resolvers
import resUser from './resolvers/user'
import resRecipe from './resolvers/recipe'

createConnection().then(connection => {
// -- TEST CONECTION
    let user= new User();
    user.name='some name test';
    return connection
        .getRepository(User)
        .findOne(1)
        .then(user => {
            console.log("get user test: ", user);
        });

}).catch(error => {
console.log("Error: ", error)
});

const server = new ApolloServer({ 
	typeDefs: [schQuery, schMutation, schRecipe, schUser], 
	resolvers: merge(resUser, resRecipe)
});
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);


/*
introspection: true,
playground: true,
*/