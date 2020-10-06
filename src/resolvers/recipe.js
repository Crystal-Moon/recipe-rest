
import { UserInputError, ForbiddenError, ApolloError } from 'apollo-server-express';
import { getConnection as conn } from 'typeorm';
import { combineResolvers } from 'graphql-resolvers';
import { verifyFields, isAuthenticated } from '../util/verify';
import { Recipe } from '../entity/Recipe';
import { Category } from '../entity/Category';
import { newCategory } from './category';
import E400 from '../util/E400';

export default {
  Query: {
    getRecipes: combineResolvers( isAuthenticated,
      (_, __, { user })=> {
        return conn().getRepository(Recipe).find({ is_erase: false })
    }),

    getOneRecipe: combineResolvers( isAuthenticated,
      async(_, { id }, { user })=> {
        let recipe = await conn().getRepository(Recipe).findOne({ is_erase: false, id });
        if(!recipe) throw new ApolloError(E400.NOT_FOUND[user.lang]);

        return recipe;
    }),

    getRecipesByCategory: combineResolvers( isAuthenticated,
      async(_, { name }, { user })=> {
        let categories = await conn().getRepository(Category).find({ is_erase: false, name: name.toLowerCase() });
        return (!categories || !categories.length)? [] 
          : conn().getRepository(Recipe).find({ 
                  is_erase:false, 
                  where: categories.map(c=> ({category:{ id: c.id }}) )    
              })
    }),

    getMyRecipes: combineResolvers( isAuthenticated,
      (_, { name }, { user })=> {  
        return conn().getRepository(Recipe).find({ 
                  is_erase: false, 
                  author: user, 
                  where: {category: {is_erase: false}} 
              })
    })
	},

  Mutation: {
		createRecipe: combineResolvers( isAuthenticated, 
		  async(_, newRecipe, { user })=> {
		  	let badInput = await verifyFields('recipe', newRecipe, user.lang);
		  	if(badInput) throw new UserInputError(badInput);

		  	return conn().getRepository(Category)
                .findOne({ name: newRecipe.category.name.toLowerCase(), author: user })
		  	    .then(async category=> {
		  			newRecipe.category = category || await newCategory(newRecipe.category.name, user);
		  			newRecipe.author = user;
		  			return conn().getRepository(Recipe).save(newRecipe);
		  	})
		}),

    updateRecipe: combineResolvers( isAuthenticated,
    	async(_, update, { user })=> {
    	  let recipe = await conn().getRepository(Recipe).findOne(update.id);
    	  if(!recipe) throw new ApolloError(E400.NOT_FOUND[user.lang]);
    	  	
    	  if(recipe.author.id != user.id) throw new ForbiddenError(E400.NOT_PERMISSION[user.lang]);

    	  let badInput = await verifyFields('recipe', update, user.lang);
    	  if(badInput) throw new UserInputError(badInput);

    	  return conn().getRepository(Category)
              .findOne({ name: update.category.name.toLowerCase(), author: user })
		  	  .then(async category=> {
		  			update.category = category || await newCategory(update.category.name, user);
		    	  return conn().getRepository(Recipe).save(update).then(recipe=>recipe);
		    })
    }),

    deleteRecipe: combineResolvers( isAuthenticated,
      async(_, { id }, { user })=> {
        let recipe = await conn().getRepository(Recipe).findOne({ id, is_erase:false })
        if(!recipe) throw new ApolloError(E400.NOT_FOUND[user.lang]);

        if(recipe.author.id != user.id) throw new ForbiddenError(E400.NOT_PERMISSION[user.lang]);

        return conn().getRepository(Recipe)
            .save({ id, is_erase:true })
            .then(ok=>true);
    })
	}
}
