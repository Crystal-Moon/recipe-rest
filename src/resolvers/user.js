
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { getConnection, getManager, UpdateResult, DeleteResult } from 'typeorm'
import { verifyFields } from '../util/verify';

import E400 from '../util/E400'
import { User } from '../entity/User'
//import { Auth } from '../util/Auth' //from verify
import { Auth } from '../entity/Auth'


export default {
	Mutation:{
		registrate: async(_, { name, email, pass, lang='es' })=>{
		  let bad = await verifyFields('user',{name, email, pass}, lang);
		  if(bad) throw new UserInputError( bad.message, bad );

		  pass=Auth.hashPass(pass);

  		  return getConnection()
  			  .getRepository(User)
  			  .save({name, email, pass, lang})
  			  .then(user=>new Auth(user));
		},

		login: (_,{ email, pass })=>{
		  let hashPass = Auth.hashPass(pass)
		  return getConnection().getRepository(User).findOne({ email }).then(user=>{
			if(!user)				
				throw new AuthenticationError(E400['NOT_REGISTER']['es']);
			
			if(user.email.toUpperCase() == email.toUpperCase() 
			  && user.pass == hashPass)	
				return new Auth(user);
		
			else
				throw new AuthenticationError(E400['BAD_LOGIN'][user.lang]);
			});
		}
	}
}