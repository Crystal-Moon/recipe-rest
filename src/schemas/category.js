export default `
  input InputCategory {
    name: String!
  }

  type Category {
    id: Int
    name: String
    author: User
  }
`