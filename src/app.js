import express from 'express'
import { merge } from 'lodash'
import { ApolloServer, gql, AuthenticationError } from 'apollo-server-express'
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
import schCategory from './schemas/category'

// -- resolvers
import resUser from './resolvers/user'
import resRecipe from './resolvers/recipe'
import resCategory from './resolvers/category'

createConnection()
.then(conn => console.log('Connection success'))
.catch(error => console.log('Error: ', error));

const server = new ApolloServer({ 
  typeDefs: [schQuery, schMutation, schRecipe, schUser, schCategory], 
  resolvers: merge(resUser, resRecipe, resCategory),
  context:({req})=>({ token: req.headers['x-token'] || '' }),
  //introspection: true,
  //playground: true
});
 
const app = express();
app.get('/',(req,res)=>{
	res.sendFile(__dirname + '/index.html');
});

server.applyMiddleware({ app });
 
app.listen({ port: process.env.PORT || 4000 },()=> console.log(`Playground at http://localhost:4000${server.graphqlPath}`) );
