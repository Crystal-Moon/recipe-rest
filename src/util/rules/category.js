export default {
	name:{
		type: 'string',
		format: x => /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]{2,20}$/.test(x)?false:
		{
			es: 'debe tener entre 2 y 20 caracteres, sin simbolos',
			en: 'must has between 2 y 20 caracters, without symbols'
		}
	}
}