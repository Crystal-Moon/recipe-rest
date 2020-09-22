export default {
	id:{
		type: 'number',
		format: x => /[0-9]{1,11}/.test(x)?false:
		{
			es: 'debe ser un numero',
			en: 'must be a number'
		}
	},
	name:{
		type: 'string',
		format: x => /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]{2,20}$/.test(x)?false:
		{
			es: 'debe tener entre 2 y 20 caracteres, sin simbolos',
			en: 'must has between 2 y 20 caracters, without symbols'
		}
	}
}