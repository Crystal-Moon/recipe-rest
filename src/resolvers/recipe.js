
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { getConnection, getManager, UpdateResult, DeleteResult } from 'typeorm'
import { combineResolvers } from 'graphql-resolvers'
import { verifyFields, isAuthenticated } from '../util/verify'

import E400 from '../util/E400'
import { Recipe } from '../entity/User'
//import { Auth } from '../util/Auth' //from verify
import { Auth } from '../entity/Auth'


export default {
	Query:{

	},

	Mutation:{
		createRecipe: combineResolvers( isAuthenticated, 
		  async(_, body ,{ who })=>{
		  	console.log('lo q llega al create')
		/*  	console.log('name',name)
		  	console.log('ingredients',ingredients);
		  	console.log('category',category);
		  	console.log('description',description);
		  	*/
		  	console.log('el body ', body)

		  	let bad = await verifyFields('recipe',body)
		  	console.log('el bad',bad)

		  	if(bad) throw new UserInputError( bad );

		  	return {name: body.name, ingredients: body.ingredients};

		})
//    	createCategory(name: String!): Category
//    	updateRecipe(id: Int!): Recipe
//    	updateCategory(id: Int!, name: String!): Category
//    	deleteRecipe(id: Int!): Boolean
	}
}