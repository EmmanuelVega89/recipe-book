## Why

El libro de recetas actualmente solo permite explorar y ver recetas existentes. Los usuarios necesitan poder agregar nuevas recetas directamente desde la aplicación sin manipular la base de datos manualmente. Esta es la funcionalidad de escritura esencial que completa el flujo CRUD básico del libro.

## What Changes

- Agregar una nueva página/vista con formulario para crear recetas
- Implementar validación de todos los campos requeridos con mensajes de error en español
- Integrar con el endpoint `POST /recipes` mediante una mutación RTK Query
- Añadir navegación hacia el formulario desde la lista de recetas
- Redirigir al detalle de la receta creada tras guardar exitosamente

**In scope:**
- Formulario con: nombre, descripción, ingredientes (lista dinámica), pasos de preparación (lista dinámica con reordenamiento), categoría (dropdown desde `GET /categories`), dificultad (Fácil/Media/Difícil), tiempo de preparación, URL de imagen
- Validación con React Hook Form + Zod
- Mutación `POST /recipes` vía RTK Query

**Out of scope:**
- Edición de recetas existentes
- Subida de archivos/imágenes (solo URL)
- Previsualización de imagen en tiempo real

## Capabilities

### New Capabilities
- `recipe-create`: Formulario para crear nuevas recetas con validación y persistencia vía `POST /recipes`

### Modified Capabilities
- `recipe-listing`: Agregar botón/enlace "Nueva Receta" que navegue al formulario de creación

## Impact

- **Nuevo feature:** `src/features/recipes/` — añadir componente `RecipeForm`, página `CreateRecipePage`, y endpoint de mutación en el API slice
- **Modificado:** `src/features/recipes/` — extender el API slice existente con la mutación `createRecipe`
- **Rutas:** Agregar ruta `/recipes/new` en el router de la aplicación
- **Navegación:** Botón "Nueva Receta" en la página de listado de recetas
- **Dependencias:** React Hook Form + Zod (verificar si ya están instalados)
