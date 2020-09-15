export default {
	name:{
		type: 'string',
		format: x => /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]{2,50}$/.test(x)?false:
		{
			es: 'debe tener entre 2 y 50 caracteres, sin simbolos',
			en: 'must has between 2 y 50 caracters, without symbols'
		}
	},
	cant:{
		type: 'string',
		format: x => /^[a-zA-Z0-9]{2,10}$/.test(x)?false:
		{
			es: 'use abrebiaturas ',
			en: 'abreviaturas'
		}
	}
}