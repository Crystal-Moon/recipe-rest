export default `
  type Recipe {
    id: Int
    name: String
    author: User
    description: String
    ingredients: [Ingredient]
    category: Category
  }

  input InputIngredient {
    cant: String!
    name: String!
  }

  type Ingredient {
    id: Int
    cant: String
    name: String
  }
`;