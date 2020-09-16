export default `
  type Auth {
  	token: String
    expire_at: Int
  	user: User
  }

  type User {
    id: Int
    name: String
  }
`;