import { verifyFields } from '../verify'

export default {
	id:{
		type: 'number',
		format: x => /[0-9]{1,11}/.test(x)?false:{
			es: 'debe ser un numero',
			en: 'must be a number'
		}
	},
	name:{
		type: 'string',
		format: x => /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ()\[\]/\.\-_]{2,50}$/.test(x)?false:
		{
			es: 'debe tener entre 2 y 50 caracteres, sin simbolos especiales',
			en: 'must has between 2 y 50 caracters, without special symbols'
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
		format: (x,l) => (!Array.isArray(x) || !x[0])?
		{
			es: 'debe ser una lista con al menos un elemento.',
			en: 'must be a list with at least one element'
		}
		: x.reduce(async(bad,i) => bad || await verifyFields('ingredient',i,l),0),
	},
	category:{
		type: 'object',
		format: async (x,l) => await verifyFields('category',x,l)
	}
}