
import { AuthenticationError, UserInputError, ForbiddenError, ApolloError } from 'apollo-server-express'
import { getConnection as conn } from 'typeorm'
import { combineResolvers } from 'graphql-resolvers'
import { verifyFields, isAuthenticated } from '../util/verify'
import { Recipe } from '../entity/Recipe'
import { Category } from '../entity/Category'
import { newCategory } from './category'
import E400 from '../util/E400'

export default {
	Query:{
    getRecipes: combineResolvers( isAuthenticated,
      (_, __, { who })=>{
        return conn().getRepository(Recipe).find({ is_erase: false })
    }),

    getOneRecipe: combineResolvers( isAuthenticated,
      async(_, { id },{ who })=>{
        let recipe = await conn().getRepository(Recipe).findOne({ is_erase: false, id });
        if(!recipe) 
            throw new ApolloError(E400['NOT_FOUND'][who.lang]);

        return recipe;
    }),

    getRecipesByCategory: combineResolvers( isAuthenticated,
      async(_, { name },{ who })=>{
        let categories = await conn().getRepository(Category).find({ is_erase: false, name: name.toLowerCase() });
        return (!categories || !categories.length)? [] 
          : conn().getRepository(Recipe).find({ 
                  is_erase:false, 
                  where: categories.map(c=> ({category:{ id: c.id }}) )    
              })
    }),

    getMyRecipes: combineResolvers( isAuthenticated,
      (_, { name },{ who })=>{  
        return conn().getRepository(Recipe).find({ is_erase: false, author: who })
    })
	},

	Mutation:{
		createRecipe: combineResolvers( isAuthenticated, 
		  async(_, newRecipe ,{ who })=>{
		  	let bad = await verifyFields('recipe', newRecipe, who.lang);
		  	if(bad) throw new UserInputError(bad);

		  	return conn().getRepository(Category).findOne({ name: newRecipe.category.name.toLowerCase(), author: who })
		  	  .then(async category=>{
		  			newRecipe.category = category || await newCategory(newRecipe.category.name, who);
		  			newRecipe.author = who;
		  			return conn().getRepository(Recipe).save(newRecipe);
		  	})
		}),

    updateRecipe: combineResolvers( isAuthenticated,
    	async(_, update, { who })=>{
    	  let recipe = await conn().getRepository(Recipe).findOne(update.id);
    	  if(!recipe) 
    	  		throw new ApolloError(E400['NOT_FOUND'][who.lang]);
    	  	
    	  if(recipe.author.id != who.id)
    	  		throw new ForbiddenError(E400['NOT_PERMISSION'][who.lang]);

    	  let bad = await verifyFields('recipe', update, who.lang);
    	  if(bad) throw new UserInputError( bad );

    	  return conn().getRepository(Category).findOne({ name: update.category.name.toLowerCase(), author: who })
		  	  .then(async category=>{
		  			update.category = category || await newCategory(update.category.name, who);
		    	  return conn().getRepository(Recipe).save(update).then(recipe=>recipe);
		    })
    }),

    deleteRecipe: combineResolvers( isAuthenticated,
      async(_, { id }, { who })=>{
        let recipe = await conn().getRepository(Recipe).findOne({ id, is_erase:false })
        if(!recipe)
            throw new ApolloError(E400['NOT_FOUND'][who.lang]);

        if(recipe.author.id != who.id)
            throw new ForbiddenError(E400['NOT_PERMISSION'][who.lang]);

        return conn().getRepository(Recipe).save({ id, is_erase:true }).then(ok=>true);
    })
	}
}
