export default `
  type Query {
  	# Retorna todas las recetas, de todos los usuarios
    getRecipes: [Recipe]
    # Retorna una sola receta
    getOneRecipe(id: Int!): Recipe
    # Retorna recetas de todos los usuarios que coincidan con la categoría
    getRecipesByCategory(name: String!): [Recipe]
    # Retorna las recetas del usuario
    getMyRecipes: [Recipe]

    # Retorna todas las categorias de todos los usuarios
    getCategories: [Category]
    # Retorna una sola categoría
    getOneCategory(id: Int!): Category
    # Retorna las categorias dsel usuario.
    getMyCategories: [Category]
  }
`;