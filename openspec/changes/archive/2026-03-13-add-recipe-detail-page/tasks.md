## 1. Setup

- [x] 1.1 Instalar `react-router-dom` como dependencia del proyecto

## 2. Routing

- [x] 2.1 Configurar `BrowserRouter`, `Routes` y `Route` en `App.tsx` con rutas `/` (RecipeList) y `/recipes/:id` (RecipeDetail)

## 3. API

- [x] 3.1 Agregar endpoint `getRecipeById` al API slice de RTK Query (`GET /recipes/:id`) y exportar el hook `useGetRecipeByIdQuery`

## 4. Recipe Detail

- [x] 4.1 Crear componente `RecipeDetail` en `features/recipes/components/RecipeDetail.tsx` que extraiga el parámetro `id` de la URL, obtenga la receta con `useGetRecipeByIdQuery`, y muestre: imagen grande, nombre, descripción, lista de ingredientes, pasos numerados, categoría, dificultad y tiempo
- [x] 4.2 Agregar estados de carga y error al componente RecipeDetail
- [x] 4.3 Agregar botón "Volver al listado" que navegue a `/`

## 5. Recipe Card Navigation

- [x] 5.1 Envolver `RecipeCard` en un `Link` de React Router que navegue a `/recipes/:id`
