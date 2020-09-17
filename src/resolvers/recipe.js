
import { AuthenticationError, UserInputError, ForbiddenError, ApolloError } from 'apollo-server-express'
import { getConnection as conn } from 'typeorm'
import { combineResolvers } from 'graphql-resolvers'
import { verifyFields, isAuthenticated } from '../util/verify'
import E400 from '../util/E400'


import { Recipe } from '../entity/Recipe'
import { Category } from '../entity/Category'

export default {
	Query:{

	},

	Mutation:{
		createRecipe: combineResolvers( isAuthenticated, 
		  async(_, newRecipe ,{ who })=>{
		  	let bad = await verifyFields('recipe', newRecipe, who.lang);
		  	if(bad) throw new UserInputError(bad);

		  	return conn().getRepository(Category).findOne({ name: newRecipe.category.name.toLowerCase(), author: who })
		  	  	.then(async category=>{
		  			newRecipe.category = category || await newCategory(newRecipe.category.name, who).then(category=>category);
		  			newRecipe.author = who;
		  			return conn().getRepository(Recipe).save(newRecipe).then(recipe=>recipe);
		  		})
		}),

    	updateRecipe: combineResolvers( isAuthenticated,
    	  async(_, update, { who })=>{
    	  	let recipe = await conn().getRepository(Recipe).findOne(update.id).then(recipe=>recipe);
    	  	if(!recipe) 
    	  		throw new ApolloError(E400['NOT_FOUND'][who.lang]);
    	  	
    	  	if(recipe.author.id != who.id)
    	  		throw new ForbiddenError(E400['NOT_PERMISSION'][who.lang]);

    	  	let bad = await verifyFields('recipe', update, who.lang);
    	  	if(bad) throw new UserInputError( bad );

    	  	return conn().getRepository(Category).findOne({ name: update.category.name.toLowerCase(), author: who })
		  	  	.then(async category=>{
		  			update.category = category || await newCategory(update.category.name, who).then(category=>category);
		    	  	return conn().getRepository(Recipe).save(update).then(recipe=>recipe);
		    	})
    	}),

        deleteRecipe: combineResolvers( isAuthenticated,
          (_, { id }, { who })=>{
            return conn().getRepository(Recipe).findOne({ id, is_erase:false }).then(recipe=>{
              if(!recipe)
                throw new ApolloError(E400['NOT_FOUND'][who.lang]);

              if(recipe.author.id != who.id)
                throw new ForbiddenError(E400['NOT_PERMISSION'][who.lang]);

              return conn().getRepository(Recipe).save({ id, is_erase:true }).then(ok=>true);
            })
        }),

        createCategory: combineResolvers( isAuthenticated, 
          async(_, { name } ,{ who })=>{
            let bad = await verifyFields('category', { name }, who.lang);
            if(bad) throw new UserInputError( bad );

            return newCategory(name,who);
        }),

    	updateCategory: combineResolvers(
    	  isAuthenticated,
    	  async(_, update, { who })=>{
    		let category = await conn().getRepository(Category).findOne(update.id).then(category=>category);
    		if(!category)
    			throw new ApolloError(E400['NOT_FOUND'][who.lang]);

    		if(category.author.id != who.id)
    			throw new ForbiddenError(E400['NOT_PERMISSION'][who.lang]);

    		let bad = await verifyFields('category', update, who.lang);
    		if(bad) throw new UserInputError(bad);

    		return conn().getRepository(Category).save(update).then(category=>category);
    	}),

    	deleteCategory: combineResolvers( isAuthenticated,
          (_, { id }, { who })=>{
            return conn().getRepository(Category).findOne({ id, is_erase:false }).then(category=>{
              if(!category)
                throw new ApolloError(E400['NOT_FOUND'][who.lang]);

              if(category.author.id != who.id)
                throw new ForbiddenError(E400['NOT_PERMISSION'][who.lang]);

              return conn().getRepository(Category).save({ id, is_erase:true }).then(ok=>true);
            })
        })
	}
}

const newCategory=(name, author)=>
	conn().getRepository(Category)
	.save({ name: name.toLowerCase(), author })
	.then(category=>category);