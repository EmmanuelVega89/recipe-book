## Context

El proyecto ya cuenta con React Hook Form, Zod y `@hookform/resolvers` instalados. El API slice `recipesApi` expone queries para listar, obtener por ID y categorías, pero no tiene mutación de creación. El router usa React Router DOM v7 con rutas en `App.tsx`. No existe ningún formulario de creación en el proyecto.

**Archivos relevantes actuales:**
- `src/features/recipes/api/recipesApi.ts` — API slice con queries existentes
- `src/features/recipes/types/recipe.ts` — Tipos `Recipe` y `Category`
- `src/App.tsx` — Router con rutas `/` y `/recipes/:id`
- `src/features/recipes/components/RecipeList.tsx` — Lista de recetas (a modificar para añadir botón)

## Goals / Non-Goals

**Goals:**
- Añadir mutación `createRecipe` al API slice existente (`POST /recipes`)
- Crear `RecipeForm` como componente controlado con React Hook Form + Zod
- Crear `CreateRecipePage` que envuelve el formulario y maneja navegación
- Registrar ruta `/recipes/new` antes de `/recipes/:id` para evitar conflicto de rutas
- Añadir botón "Nueva Receta" en `RecipeList` que navegue a `/recipes/new`
- Redirigir a `/recipes/:id` tras creación exitosa

**Non-Goals:**
- Edición de recetas existentes
- Subida de archivos de imagen (solo URL como texto)
- Previsualización de imagen en tiempo real

## Decisions

### 1. Extender `recipesApi` en lugar de crear un nuevo slice

**Decisión:** Añadir el endpoint `createRecipe` en el archivo `recipesApi.ts` existente.

**Razón:** El proyecto tiene la convención de un API slice por feature. Separarlo crearía fragmentación innecesaria. RTK Query soporta mezcla de queries y mutations en el mismo `createApi`.

**Alternativa descartada:** Crear `recipesMutationsApi.ts` separado — innecesario y contrario al patrón del proyecto.

---

### 2. Tipo `RecipeFormData` separado del tipo `Recipe`

**Decisión:** Inferir el tipo del formulario desde el schema Zod (`z.infer<typeof recipeSchema>`), no reutilizar `Recipe` directamente.

**Razón:** `Recipe` incluye `id` que el backend genera. El formulario solo trabaja con los campos que el usuario ingresa. Usar Zod como fuente de verdad garantiza coherencia entre validación y tipos TypeScript.

---

### 3. Campos dinámicos de ingredientes y pasos con `useFieldArray`

**Decisión:** Usar `useFieldArray` de React Hook Form para los arrays de ingredientes y pasos.

**Razón:** Es el patrón oficial de RHF para listas dinámicas. Integra correctamente con el estado del formulario y la validación Zod. Para los pasos, también permite reordenamiento usando los índices del array.

**Alternativa descartada:** Estado local (`useState`) separado del formulario — duplica estado y complica la validación.

---

### 4. Orden de rutas: `/recipes/new` antes de `/recipes/:id`

**Decisión:** Registrar la ruta `/recipes/new` antes de `/recipes/:id` en `App.tsx`.

**Razón:** React Router v7 con `Routes` usa el primer match. Si `/recipes/:id` va primero, "new" sería interpretado como un ID numérico/string, causando una request fallida a `GET /recipes/new`.

## Risks / Trade-offs

- **[Riesgo] Conflicto de ruta `/recipes/new` vs `/recipes/:id`** → Mitigación: Registrar `/recipes/new` primero en el router.
- **[Trade-off] `imageUrl` como texto libre** → No hay validación de que la URL sea una imagen real; Zod solo valida formato URL. Aceptado como comportamiento esperado dado el scope.
- **[Riesgo] `GET /categories` falla o devuelve lista vacía** → El dropdown queda vacío; mostrar estado de carga y mensaje de error si falla la query.

## Files Changed

**Nuevos:**
- `src/features/recipes/components/RecipeForm.tsx` — Componente de formulario
- `src/features/recipes/pages/CreateRecipePage.tsx` — Página que contiene el formulario

**Modificados:**
- `src/features/recipes/api/recipesApi.ts` — Añadir mutación `createRecipe` y exportar hook
- `src/App.tsx` — Añadir ruta `/recipes/new`
- `src/features/recipes/components/RecipeList.tsx` — Añadir botón "Nueva Receta"
