export default `
  type Mutation {
    # pass: Usar entre 6 y 20 caracteres, solo numeros y letras. El lang es opcional. Usar 'en' o 'es' (default).
    registrate(name: String!, email: String!, pass: String!, lang: String): Auth
  	login(email: String!, pass: String!): Auth

    createRecipe(name: String!, ingredients: [InputIngredient!]!, category: InputCategory!, description: String): Recipe
    # Solo el creador de la receta puede editarla.
    updateRecipe(id: Int!, name: String!, ingredients: [InputIngredient!]!, category: InputCategory!, description: String): Recipe
    # Solo el creador de la receta pude eliminarla.
    deleteRecipe(id: Int!): Boolean

    createCategory(name: String!): Category
    # Solo el creador de la categoría puede editarla
    updateCategory(id: Int!, name: String!): Category
    # Solo el creador de la categoría puede eliminarla.
    deleteCategory(id: Int!): Boolean    
  }
`;