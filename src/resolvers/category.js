
import { AuthenticationError, UserInputError, ForbiddenError, ApolloError } from 'apollo-server-express'
import { getConnection as conn } from 'typeorm'
import { combineResolvers } from 'graphql-resolvers'
import { verifyFields, isAuthenticated } from '../util/verify'
import { Category } from '../entity/Category'
import E400 from '../util/E400'

export default {
	Query:{
        //getCategories: [Category]
        //getOneCategory(id: Int!): Category
	},

	Mutation:{
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

export const newCategory=(name, author)=>
	conn().getRepository(Category)
	.save({ name: name.toLowerCase(), author })
	.then(category=>category);