
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
  //let bad=null;
console.log('el obj que llega a verify',obj)

  for(let k in obj){

/*console.log('rule:',rule,'k:',k,'requerid')
  	if(!obj[k] && r[k].is_required)
  		throw  {error_code: 'REQUERID', message: `${k.toUpperCase()} is requerid`};
    */


console.log('rule:',rule,'k:',k,'type')
  	if(typeof obj[k] != r[k].type)
  		throw `${k.toUpperCase()}: use '${r[k].type}'`;

    let bad_format=await r[k].format(obj[k],lang);
console.log('rule:',rule,'k:',k,'format',bad_format)
  	if(bad_format){
      //console.log('f-format__rule:',rule,'k:',k, 'r:',r[k].format(obj[k]))
  		//throw {error_code: 'INCORRECT_FORMAT', message: `${k.toUpperCase()}: ${bad_format}`};
      throw `${rule.toUpperCase()}: ${k.toUpperCase()}: ${bad_format[lang]||bad_format}`
      //throw bad_format
    }
  }

  return 0;

}catch(bad){ return bad }
}
