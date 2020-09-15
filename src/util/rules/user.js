export default {
	name:{
		type: 'string',
		format: x => /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]{2,25}$/.test(x)?false:
		{
			es: 'debe tener entre 2 y 25 caracteres, sin simbolos',
			en: 'must has between 2 y 25 caracters, without symbols'
		}
	},
	email:{
		type: 'string',
		format: x => /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(x)?false:
		{
			es: 'debe ser un email valido',
			en: 'must be valid email'
		}
	},
	pass:{
		type: 'string',
		format: x => /[a-zA-Z0-9]{6,20}/.test(x)?false:
		{
			es: 'debe tener entre 6 y 20 caracteres, solo letras y numeros',
			en: 'must has between 6 y 20 caracters, only letters and numbers'
		}
	},
	lang:{
		type: 'string',
		format: x => /(es|en)/.test(x)?false:
		{
			es: 'usar ISO 639-1 (2 letras minusculas)',
			en: 'use ISO 639-1 (2 lowercase letter)'
		}
	}
}