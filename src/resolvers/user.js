
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { getConnection as conn } from 'typeorm';
import { verifyFields } from '../util/verify';
import { User } from '../entity/User';
import { Auth } from '../entity/Auth';
import E400 from '../util/E400';

export default {
  Mutation:{
	registrate: async(_, { name, email, pass, lang })=>{
	  lang = /(es|en)/.test(lang)? lang : 'es';
	  let badInput = await verifyFields('user',{name, email, pass}, lang);
	  if(badInput) throw new UserInputError(badInput);

	  pass = Auth.hashPass(pass);

	  let exist = await conn().getRepository(User).findOne({ email })
	  if(exist) throw new UserInputError(E400.EXISTS[lang])
  		  	
  	  return conn()
  			.getRepository(User)
  			.save({name, email, pass, lang})
  			.then(user=> new Auth(user));
	},

	login: async(_, { email, pass })=> {
	  let hashPass = Auth.hashPass(pass)
	  let user = await conn().getRepository(User).findOne({ email })
	  if(!user) throw new AuthenticationError(E400.NOT_REGISTER['es']);
			
	  if(user.email.toUpperCase() == email.toUpperCase() && user.pass == hashPass) return new Auth(user);
		
	  else throw new AuthenticationError(E400.BAD_LOGIN[user.lang]);
	}
  }
}
