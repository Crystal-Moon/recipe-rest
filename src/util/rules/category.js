export default {
	name:{
		type: 'string',
		format: x => /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]{2,15}$/.test(x)?false:
		{
			es: 'debe tener entre 2 y 15 caracteres, sin simbolos',
			en: 'must has between 2 y 15 caracters, without symbols'
		}
	}
}