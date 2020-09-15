export default `
  type Recipe {
    id: Int
    name: String
    author: String
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

  input InputCategory {
    name: String!
  }

  type Category {
    id: Int
    name: String
  }
`;