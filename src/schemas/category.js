export default `
  input InputCategory {
  	# Usar entre dos y 20 caracteres, sin simbolos especiales
    name: String!
  }

  type Category {
    id: Int
    name: String
    # Se establee automaticamente
    author: User
  }
`