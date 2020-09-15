
import user from './rules/user'
import recipe from './rules/recipe'
import ingredient from './rules/ingredient'
import category from './rules/category'

const RULES={user}

export const verifyFields = async(rule, obj, lang='es') =>{
try{
  let r=RULES[rule];
//console.log('el obj que llega a verify',obj)

  for(let k in obj){

  	if(!obj[k] && r[k].is_required)
  		throw  {error_code: 'REQUERID', message: `${k.toUpperCase()} is requerid`};

  	if(typeof obj[k] != r[k].type)
  		throw {error_code: 'INCORRECT_TYPE', message: `${k.toUpperCase()}: use '${r[k].type}'`};

  	if(await ! r[k].format(obj[k]))
  		throw {error_code: 'INCORRECT_FORMAT', message: `${k.toUpperCase()}: ${r[k].message[lang]}`};
  }

  return 0;

}catch(bad){ return bad }
}



/*
 [
    {
      "message": "probando error",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "registrate"
      ],
      "extensions": {
        "bad": {
          "code": "INCORRECT_FORMAT",
          "message": "email: debe ser un email valido"
        },
        "code": "BAD_USER_INPUT",
        "exception": {
          "bad": {
            "code": "INCORRECT_FORMAT",
            "message": "email: debe ser un email valido"
          }
        }
      }
    }
  ],
  */
  /*
  {
  "message": "Failed to get events due to validation errors",
  "extensions": {
    "code": "BAD_USER_INPUT",
    "exception": {
      "validationErrors": {
        "zipCode": "This is not a valid zipcode"
      }
    }
  }
}
*/
/* prood
{
  "errors": [
    {
      "message": "Hubo un error",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "registrate"
      ],
      "extensions": {
        "errorCode": "INCORRECT_FORMAT",
        "message": "email: debe ser un email valido",
        "code": "BAD_USER_INPUT",
        "exception": {
          "errorCode": "INCORRECT_FORMAT"
        }
      }
    }
  ],
  "data": {
    "registrate": null
  }
}
*/