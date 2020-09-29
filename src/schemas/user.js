export default `
  type Auth {
  	# Usar el token en la propiedad "x-token" en la cabecera.
  	token: String
  	# Fecha en Unix de cuando vencerá el token
    expire_at: Float
  	user: User
  }

  type User {
    id: Int
    name: String
    email: String
  }
`;