## 1. Domain Types

- [x] 1.1 Crear `src/features/recipes/types/recipe.ts` con la interface Recipe (id, name, description, ingredients, steps, category, difficulty, prepTime, imageUrl)

## 2. RTK Query API Slice

- [x] 2.1 Crear `src/features/recipes/api/recipesApi.ts` con createApi, baseQuery apuntando a `http://localhost:3001`, y endpoint `getRecipes` que haga GET a `/recipes`
- [x] 2.2 Exportar el hook autogenerado `useGetRecipesQuery` desde el API slice

## 3. Store Integration

- [x] 3.1 Actualizar `src/store/store.ts` para agregar el reducer de `recipesApi` y concatenar su middleware

## 4. Recipe Card Component

- [x] 4.1 Crear `src/features/recipes/components/RecipeCard.tsx` — componente presentacional que recibe Recipe como prop y muestra: imagen (con alt), nombre, badge de categoría, dificultad y tiempo de preparación formateado

## 5. Recipe List Component

- [x] 5.1 Crear `src/features/recipes/components/RecipeList.tsx` — componente container que usa `useGetRecipesQuery`, maneja estados de loading, error y lista vacía, y renderiza un grid responsive de RecipeCards

## 6. App Integration

- [x] 6.1 Actualizar `src/App.tsx` para importar y renderizar RecipeList como contenido principal de la página
