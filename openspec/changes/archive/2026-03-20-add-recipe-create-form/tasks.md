## 1. API y Mutación RTK Query

- [x] 1.1 Añadir endpoint `createRecipe` en `src/features/recipes/api/recipesApi.ts` usando `builder.mutation<Recipe, Omit<Recipe, 'id'>>` con `POST /recipes`
- [x] 1.2 Exportar el hook `useCreateRecipeMutation` desde `recipesApi.ts`

## 2. Validación con Zod

- [x] 2.1 Crear schema Zod `recipeSchema` en `src/features/recipes/components/RecipeForm.tsx` con todos los campos requeridos y sus validaciones
- [x] 2.2 Definir tipo `RecipeFormData` inferido de `z.infer<typeof recipeSchema>`

## 3. Componente RecipeForm

- [x] 3.1 Crear `src/features/recipes/components/RecipeForm.tsx` con `useForm` de React Hook Form y resolver Zod
- [x] 3.2 Implementar campo de texto para nombre con mensaje de error
- [x] 3.3 Implementar textarea para descripción con mensaje de error
- [x] 3.4 Implementar dropdown de categoría usando `useGetCategoriesQuery` con estado de carga y error
- [x] 3.5 Implementar selector de dificultad con opciones Fácil/Media/Difícil
- [x] 3.6 Implementar campo numérico para tiempo de preparación con mensaje de error
- [x] 3.7 Implementar campo de texto para URL de imagen con mensaje de error
- [x] 3.8 Implementar lista dinámica de ingredientes con `useFieldArray` (agregar/eliminar, mínimo 1)
- [x] 3.9 Implementar lista dinámica de pasos con `useFieldArray` (agregar/eliminar/reordenar con subir y bajar)
- [x] 3.10 Implementar botón "Guardar receta" con estado de carga (`isLoading`) y deshabilitado durante envío
- [x] 3.11 Implementar botón "Cancelar" que navega a `/`
- [x] 3.12 Manejar `onSubmit`: llamar `createRecipe`, redirigir a `/recipes/:id` en éxito, mostrar error general en fallo

## 4. Página CreateRecipePage

- [x] 4.1 Crear `src/features/recipes/pages/CreateRecipePage.tsx` que renderice `RecipeForm` con un encabezado "Nueva Receta"

## 5. Router y Navegación

- [x] 5.1 Añadir ruta `/recipes/new` en `src/App.tsx` apuntando a `CreateRecipePage`, **antes** de la ruta `/recipes/:id`
- [x] 5.2 Añadir botón/enlace "Nueva Receta" en `src/features/recipes/components/RecipeList.tsx` que navegue a `/recipes/new`

## 6. Verificación

- [x] 6.1 Verificar que navegar a `/recipes/new` muestra el formulario vacío con todos los campos
- [x] 6.2 Verificar que el dropdown de categoría se puebla desde la API
- [x] 6.3 Verificar que agregar/eliminar ingredientes y pasos funciona correctamente
- [x] 6.4 Verificar que los botones de reordenamiento de pasos funcionan y respetan los límites
- [x] 6.5 Verificar que enviar el formulario vacío muestra todos los mensajes de error en español
- [x] 6.6 Verificar que guardar una receta válida llama `POST /recipes` y redirige al detalle
- [x] 6.7 Verificar que el botón "Nueva Receta" en el listado navega correctamente
