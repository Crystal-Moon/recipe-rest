export default `
  type Mutation {
    registrate(name: String!, email: String!, pass: String!, lang: String): Auth
  	login(email: String!, pass: String!): Auth

    createRecipe(name: String!, ingredients: [InputIngredient!]!, category: InputCategory!, description: String): Recipe
    createCategory(name: String!): Category
    updateRecipe(id: Int!): Recipe
    updateCategory(id: Int!, name: String!): Category
    deleteRecipe(id: Int!): Boolean
  }
`;