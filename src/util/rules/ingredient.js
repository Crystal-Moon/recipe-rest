export default {
	name: {
		type: 'string',
		format: x => /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ'"\-_/\\()\[\].,]{2,100}$/.test(x)?false:
		{
			es: 'debe tener entre 2 y 100 caracteres, sin simbolos especiales',
			en: 'must has between 2 y 100 caracters, without special symbols'
		}
	},
	cant: {
		type: 'string',
		format: x => /(([0-9\.,]{1,4})(g|gr|kg|l|ml|cc|cm|u|un|taza|tazas|cup|cups|tbsp|tsp|cdita|cda|fl oz|oz|lb|pulg|"|'|C|F)(\.|)|(some|pizca|poco|a gusto))/g.test(x)?false:
		{
			es: 'use abreviaturas, ej. gr,kg,ml,cc,oz,lb,taza,cup,etc.; haga converciones, ej. 1000gr => 1kg',
			en: 'use abbreviations, eg. gr,kg,ml,cc,oz,lb,taza,cup,etc.; converts, eg. 1000gr => 1kg'
		}
	}
}
