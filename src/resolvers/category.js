
import { UserInputError, ForbiddenError, ApolloError } from 'apollo-server-express';
import { getConnection as conn } from 'typeorm';
import { combineResolvers } from 'graphql-resolvers';
import { verifyFields, isAuthenticated } from '../util/verify';
import { Category } from '../entity/Category';
import E400 from '../util/E400';

export default {
  Query: {
    getCategories: combineResolvers( isAuthenticated,
      (_,__,{ user })=> {
        return conn().getRepository(Category).find({ is_erase: false })
    }),

    getOneCategory: combineResolvers( isAuthenticated,
      async(_,{ id }, { user })=> {
        let category = await conn().getRepository(Category).findOne({ is_erase: false, id });
        if(!category) throw new ApolloError(E400.NOT_FOUND[user.lang]);

        return category;
    }),

    getMyCategories: combineResolvers( isAuthenticated,
      (_,__,{ user })=> {
        return conn().getRepository(Category).find({ is_erase: false, author: user })
    }),
	},

  Mutation: {
    createCategory: combineResolvers( isAuthenticated, 
      async(_, { name }, { user })=> {
        let badInput = await verifyFields('category', { name }, user.lang);
        if(badInput) throw new UserInputError(badInput);

        return newCategory(name,user);
    }),

    updateCategory: combineResolvers( isAuthenticated,
    	async(_, { id, name }, { user })=> {
    		let category = await conn().getRepository(Category).findOne(id);
    		if(!category) throw new ApolloError(E400.NOT_FOUND[user.lang]);

    		if(category.author.id != user.id) throw new ForbiddenError(E400.NOT_PERMISSION[user.lang]);

    		let badInput = await verifyFields('category', { id, name }, user.lang);
    		if(badInput) throw new UserInputError(badInput);

    		return conn().getRepository(Category).save({ id, name });
    }),

    deleteCategory: combineResolvers( isAuthenticated,
      async(_, { id }, { user })=> {
        let category = await conn().getRepository(Category).findOne({ id, is_erase:false });
        if(!category) throw new ApolloError(E400.NOT_FOUND[user.lang]);

        if(category.author.id != user.id) throw new ForbiddenError(E400.NOT_PERMISSION[user.lang]);

        return conn().getRepository(Category)
            .save({ id, is_erase:true })
            .then(ok=>true);
    })
	}
}

export const newCategory = (name, author)=>
	conn().getRepository(Category)
	.save({ name: name.toLowerCase(), author })
	.then(category=>category);