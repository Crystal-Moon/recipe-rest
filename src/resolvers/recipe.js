
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { getConnection, getManager, UpdateResult, DeleteResult } from 'typeorm'
import { combineResolvers } from 'graphql-resolvers'
import { verifyFields, isAuthenticated } from '../util/verify'


import { Recipe } from '../entity/Recipe'
import { Category } from '../entity/Category'

export default {
	Query:{

	},

	Mutation:{
		createRecipe: combineResolvers( isAuthenticated, 
		  async(_, newRecipe ,{ who })=>{
		  	let bad = await verifyFields('recipe', newRecipe, who.lang);
		  	if(bad) throw new UserInputError( bad );

		  	return getConnection().getRepository(Category).findOne({ name: newRecipe.category.name.toLowerCase() })
		  	  	.then(async category=>{
		  			newRecipe.category=category || await newCategory(newRecipe.category.name).then(category=>category);
		  			newRecipe.author=who;
		  			return getConnection().getRepository(Recipe).save(newRecipe).then(recipe=>recipe);
		  		})
		}),
    	createCategory: combineResolvers( isAuthenticated, 
		  async(_, { name } ,{ who })=>{
		  	let bad = await verifyFields('category', {name}, who.lang)
		  	if(bad) throw new UserInputError( bad );

		  	return newCategory(name);
		}),
//    	updateRecipe(id: Int!): Recipe
//    	updateCategory(id: Int!, name: String!): Category
//    	deleteRecipe(id: Int!): Boolean
	}
}

const newCategory=(name)=>
	getConnection().getRepository(Category)
	.save({ name: name.toLowerCase() })
	.then(category=>category);