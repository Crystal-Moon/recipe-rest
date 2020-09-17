export default `
  type Query {
    getRecipes: [Recipe]
    getRecipesByCategory(category: String!): [Recipe]
    getOneRecipe(id: Int!): Recipe
    getCategories: [Category]
    getOneCategory(id: Int!): Category
    getMyRecipes: [Recipe]
  }
`;