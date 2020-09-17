
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { getConnection as conn } from 'typeorm'
import { verifyFields } from '../util/verify'
import { User } from '../entity/User'
import { Auth } from '../entity/Auth'
import E400 from '../util/E400'

export default {
	Mutation:{
		registrate: async(_, { name, email, pass, lang='es' })=>{
		  let bad = await verifyFields('user',{name, email, pass}, lang);
		  if(bad) throw new UserInputError(bad);

		  pass=Auth.hashPass(pass);

		  return conn().getRepository(User).findOne({ email }).then(user=>{
		    if(user) throw new UserInputError(E400['EXISTS'][lang])
  		  	
  		  	return conn()
  			  .getRepository(User)
  			  .save({name, email, pass, lang})
  			  .then(user=>new Auth(user));
  		  })
		},

		login: (_,{ email, pass })=>{
		  let hashPass = Auth.hashPass(pass)
		  return conn().getRepository(User).findOne({ email }).then(user=>{
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

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6InBlciIsImVtYWlsIjoicGVyQGdtYWlsLmNvbSIsInBhc3MiOiJleUpoYkdjaU9pSklVekkxTmlKOS5jR1Z5TVRJei5Nd3NPTGs2X1JOWG95V3lzZEtxelpqRldsSGdoSzhKMndmRjI5TXFKQ3c4IiwibGFuZyI6ImVzIiwiaWF0IjoxNjAwMTk3NTE0LCJleHAiOjE2ODY1OTc1MTR9.dZa-kC-NST3D_hXWW4CHR7JzvzSTZF2xXFgozqVdU18

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxlZSIsImVtYWlsIjoiYWxlQGNvcnJlby5jb20iLCJwYXNzIjoiZXlKaGJHY2lPaUpJVXpJMU5pSjkuWVd4bE1USXouajJ5X2FQMlNMOXo3MWtsQkhTbGUxbTlWc0VneG85ZkNjbDFGT2Z2RWFMSSIsImxhbmciOiJlcyIsImlkIjoxMSwiaWF0IjoxNjAwMzc1MTQ3LCJleHAiOjE2ODY3NzUxNDd9.OCp_-eHxV50uGzB4kgn0rhgXlvV8RyBQKPKZFOvsHgM
*/