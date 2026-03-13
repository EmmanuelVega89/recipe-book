## Why

Con 10 recetas el listado es manejable, pero a medida que crezca el catálogo los usuarios necesitan encontrar recetas rápidamente. La búsqueda por texto y el filtro por categoría son las dos formas más naturales de navegar un catálogo de recetas.

## What Changes

- Agregar un campo de búsqueda por texto que filtra recetas por nombre y descripción (case-insensitive)
- Agregar un dropdown de filtro por categoría alimentado por `GET /categories`
- Ambos filtros funcionan en combinación (AND lógico)
- Mostrar un contador de resultados ("X recetas encontradas")
- Mostrar un estado vacío específico cuando los filtros no producen resultados
- Agregar endpoint `getCategories` al API slice existente de RTK Query

## Capabilities

### New Capabilities

- `recipe-search-filter`: Búsqueda por texto y filtro por categoría sobre el listado de recetas. Incluye los componentes de filtro, la lógica de filtrado client-side, el endpoint de categorías y el contador de resultados.

### Modified Capabilities

- `recipe-listing`: El requirement "Recipe list display" cambia para incorporar la barra de filtros sobre el grid y el contador de resultados. El estado vacío ahora diferencia entre "no hay recetas" y "no hay resultados para los filtros aplicados".

## Impact

- **Código nuevo**: Componentes `SearchBar`, `CategoryFilter` y `RecipeFilters` en `src/features/recipes/components/`; tipo `Category` en types
- **Código modificado**: `recipesApi.ts` (nuevo endpoint `getCategories`), `RecipeList.tsx` (integrar filtros, lógica de filtrado, contador)
- **Dependencias**: Ninguna nueva — se usa RTK Query existente y estado local con `useState`
- **API**: Nuevo consumo de `GET http://localhost:3001/categories`
