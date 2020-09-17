import { verifyFields } from '../verify'

export default {
	name:{
		type: 'string',
		format: x => /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]{2,50}$/.test(x)?false:
		{
			es: 'debe tener entre 2 y 50 caracteres, sin simbolos',
			en: 'must has between 2 y 50 caracters, without symbols'
		}
	},
	description:{
		type: 'string',
		format: x => x.length < 500?false:
		{
			es: 'debe tener un máximo de 500 caracteres.',
			en: 'must have maximum 500 characters.'
		}
	},
	ingredients:{
		type: 'object',
		format: async (x,l) =>
		  !Array.isArray(x) || !x[0] ?{
			es: 'debe ser un array con al menos un elemento.',
			en: 'must be an array with at least one element'
		  }
		  : x.reduce(async(bad,i)=>await verifyFields('ingredient',i,l),{}),
	},
	category:{
		type: 'object',
		format: async (x,l) => await verifyFields('category',x,l)
	}
}