## 1. Domain Types

- [x] 1.1 Crear interface `Category` (id, name) en `src/features/recipes/types/recipe.ts`

## 2. API Slice — Categories Endpoint

- [x] 2.1 Agregar endpoint `getCategories` a `recipesApi` que haga `GET /categories` y retorne `Category[]`
- [x] 2.2 Exportar el hook `useGetCategoriesQuery` desde el API slice

## 3. Filter Components

- [x] 3.1 Crear `src/features/recipes/components/SearchBar.tsx` — input de texto controlado que recibe `value` y `onChange` como props
- [x] 3.2 Crear `src/features/recipes/components/CategoryFilter.tsx` — dropdown que recibe `categories`, `value` y `onChange`; incluye opción "Todas las categorías"
- [x] 3.3 Crear `src/features/recipes/components/RecipeFilters.tsx` — layout que agrupa SearchBar y CategoryFilter en una barra horizontal responsive

## 4. RecipeList Integration

- [x] 4.1 Actualizar `RecipeList.tsx`: agregar estado local `searchTerm` y `selectedCategory` con `useState`
- [x] 4.2 Agregar lógica de filtrado con `useMemo`: filtrar por nombre/descripción (case-insensitive) y categoría en combinación AND
- [x] 4.3 Integrar `RecipeFilters` sobre el grid, pasar state/handlers
- [x] 4.4 Agregar contador de resultados ("X recetas encontradas" / "1 receta encontrada")
- [x] 4.5 Diferenciar estado vacío: sin recetas en API vs sin resultados por filtros activos
