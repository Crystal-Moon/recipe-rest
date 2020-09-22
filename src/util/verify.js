import { AuthenticationError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'
import { Auth } from '../entity/Auth'
import E400 from './E400'
import user from './rules/user'
import recipe from './rules/recipe'
import ingredient from './rules/ingredient'
import category from './rules/category'

export const isAuthenticated = (_, _args, req)=>{ //no funciona tomar las partes de req solo
  if(!req.token) throw new AuthenticationError(E400['TOKEN_NOT_FOUND']['en']);
  else{
    req.who=Auth.decode(req.token);
    return req.who? skip : new AuthenticationError(E400['BAD_TOKEN']['en']);
  }
}

const RULES={ user, recipe, ingredient, category }
export const verifyFields = async(rule, obj, lang='es') =>{
try{
  let r=RULES[rule];

  for(let k in obj){
  	if(typeof obj[k] != r[k].type)
  		throw `${k.toUpperCase()}: use '${r[k].type}'`;

    let bad_format=await r[k].format(obj[k],lang);
  	if(bad_format)
      throw `${rule.toUpperCase()}: ${k.toUpperCase()}: ${bad_format[lang]||bad_format}`;
  }

  return false;
}catch(bad){ return bad }
}
