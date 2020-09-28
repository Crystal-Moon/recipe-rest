export default `
  type Recipe {
    id: Int
    #Usar entre 2 y 50 caracteres
    name: String
    # Se establee automaticamente
    author: User
    # Usar hasta 500 caracteres
    description: String
    # Debe tener al menos un elemento
    ingredients: [Ingredient]
    # Si la categoria elegida no existe, se creará
    category: Category
  }

  input InputIngredient {
    # Usar un numero seguido de una unidad de medida abreviada. Las disponibes son: g, gr, kg, l, ml, cc, cm, u, un, taza, tazas, cup, cups, tbsp, tsp, cdita, cda, fl oz, oz, lb, pulg, " y '.
    # También se puede usar cantidades no definidas como 'a gusto', 'pizca', 'poco', some', etc.
    cant: String!
    name: String!
  }

  type Ingredient {
    id: Int
    cant: String
    name: String
  }
`;