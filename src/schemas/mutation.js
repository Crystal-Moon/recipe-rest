export default `
  type Mutation {
    registrate(name: String!, email: String!, pass: String!, lang: String): Auth
  	login(email: String!, pass: String!): Auth

    createRecipe(name: String!, ingredients: [InputIngredient!]!, category: InputCategory!, description: String): Recipe
    updateRecipe(id: Int!, name: String!, ingredients: [InputIngredient!]!, category: InputCategory!, description: String): Recipe
    deleteRecipe(id: Int!): Boolean

    createCategory(name: String!): Category
    updateCategory(id: Int!, name: String!): Category
    deleteCategory(id: Int!): Boolean    
  }
`;