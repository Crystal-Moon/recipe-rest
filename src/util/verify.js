
import { AuthenticationError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';
import { Auth } from '../entity/Auth';
import E400 from './E400';
import user from './rules/user';
import recipe from './rules/recipe';
import ingredient from './rules/ingredient';
import category from './rules/category';

export const isAuthenticated = (_, args, req)=> {
  if(!req.token) throw new AuthenticationError(E400.TOKEN_NOT_FOUND['es']);
  else {
    req.user = Auth.decode(req.token);
    return req.user? skip : new AuthenticationError(E400.BAD_TOKEN['es']);
  }
}

const RULES = { user, recipe, ingredient, category }
export const verifyFields = async(rule, obj, lang='es') => {
try {
  let r = RULES[rule];

  for(let k in obj) {
  	if(typeof obj[k] != r[k].type) throw `${k.toUpperCase()}: use '${r[k].type}'`;

    let badFormat = await r[k].format(obj[k],lang);
  	if(badFormat) throw `${k.toUpperCase()}: ${badFormat[lang] || badFormat}`;
  }

  return false;
}catch(error) { 
  return error
}
}
