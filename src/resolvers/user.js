
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { getConnection, getManager, UpdateResult, DeleteResult } from 'typeorm';
import { verifyFields } from '../util/verify';

import { User } from '../entity/User'
import { Auth } from '../util/Auth'


export default {
	Query:{
		//user: ()=>({ id:2, name:'some name' }), //Error: Query.user defined in resolvers, but not in schema
		hello: ()=>'Hola mundo'
	},

	Mutation:{
		registrate: async(_, { name, email, pass, lang='es' })=>{
		  let bad = await verifyFields('user',{name, email, pass}, lang);
		  if(bad) throw new UserInputError( bad.message, bad );

  		  return getConnection()
  			  .getRepository(User)
  			  .save({name, email, pass, lang})
  			  .then(u=>new Auth(u));
		},

		login: (email,pass)=>{

		}
	}
}