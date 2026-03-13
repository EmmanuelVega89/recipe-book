## Why

El listado de recetas solo muestra un resumen (imagen, nombre, categoría, dificultad y tiempo). No existe forma de ver la información completa de una receta — ingredientes, pasos de preparación y descripción — lo cual es esencial para que un usuario pueda cocinar siguiendo la receta.

## What Changes

- Agregar una nueva ruta `/recipes/:id` que muestre la vista de detalle de una receta individual
- Agregar un endpoint RTK Query `getRecipeById` para obtener una receta por su ID (`GET /recipes/:id`)
- Crear componente `RecipeDetail` que muestre todos los campos de la receta: imagen grande, nombre, descripción, lista de ingredientes, pasos numerados, categoría, dificultad y tiempo de preparación
- Hacer que cada `RecipeCard` del listado sea clickeable y navegue a la vista de detalle
- Incluir un botón "Volver al listado" en la vista de detalle
- Integrar React Router para manejar la navegación entre listado y detalle

## Capabilities

### New Capabilities

- `recipe-detail`: Vista de detalle de una receta individual con navegación desde el listado, fetching por ID, y visualización completa de todos los campos de la receta

### Modified Capabilities

- `recipe-listing`: Las cards del listado pasan a ser clickeables, navegando a la ruta de detalle de cada receta

## Impact

- **Dependencia nueva**: `react-router-dom` para el enrutamiento
- **App.tsx**: Se modifica para integrar el router y definir las rutas (`/` y `/recipes/:id`)
- **recipesApi.ts**: Se agrega el endpoint `getRecipeById`
- **RecipeCard.tsx**: Se envuelve en un `Link` para navegar al detalle
- **Componentes nuevos**: `RecipeDetail` dentro de `features/recipes/components/`
