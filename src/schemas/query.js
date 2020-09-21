export default `
  type Query {
    getRecipes: [Recipe]
    getOneRecipe(id: Int!): Recipe
    getRecipesByCategory(category: String!): [Recipe]
    getMyRecipes: [Recipe]
    getCategories: [Category]
    getOneCategory(id: Int!): Category
  }
`;