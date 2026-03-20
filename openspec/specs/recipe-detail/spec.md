### Requirement: Recipe detail data fetching
El sistema SHALL obtener una receta individual desde `GET http://localhost:3001/recipes/:id` utilizando RTK Query. El API slice MUST exportar un hook `useGetRecipeByIdQuery` que reciba el ID de la receta como parámetro.

#### Scenario: Fetch exitoso de receta por ID
- **WHEN** el componente RecipeDetail se monta con un ID válido
- **THEN** RTK Query ejecuta `GET /recipes/:id` y retorna un objeto Recipe completo

#### Scenario: Receta no encontrada
- **WHEN** se solicita una receta con un ID que no existe
- **THEN** el hook retorna un error y el componente muestra un mensaje indicando que la receta no fue encontrada

#### Scenario: Error de conexión
- **WHEN** la API no está disponible o retorna un error de servidor
- **THEN** el hook retorna `isError: true` y el componente muestra un mensaje de error

### Requirement: Recipe detail display
El sistema SHALL mostrar todos los campos de la receta en una vista de detalle. La vista MUST incluir: imagen grande, nombre, descripción, lista de ingredientes, pasos numerados, categoría, dificultad y tiempo de preparación.

#### Scenario: Visualización completa de la receta
- **WHEN** la receta se obtiene exitosamente
- **THEN** se muestra la imagen en tamaño grande, el nombre como heading, la descripción completa, los ingredientes como lista, los pasos como lista numerada, y badges para categoría, dificultad y tiempo

#### Scenario: Estado de carga
- **WHEN** la petición está en progreso
- **THEN** se muestra un indicador de carga

### Requirement: Recipe detail routing
El sistema SHALL definir una ruta `/recipes/:id` que renderice el componente RecipeDetail. El componente MUST extraer el parámetro `id` de la URL usando React Router.

#### Scenario: Navegación a detalle por URL
- **WHEN** el usuario navega a `/recipes/3`
- **THEN** se renderiza RecipeDetail con el ID 3 y se muestra la receta correspondiente

### Requirement: Back navigation
La vista de detalle SHALL incluir un botón para volver al listado de recetas. El botón MUST navegar a la ruta raíz (`/`).

#### Scenario: Volver al listado
- **WHEN** el usuario hace clic en el botón "Volver al listado"
- **THEN** la aplicación navega a la ruta `/` mostrando el listado de recetas

### Requirement: Share action in recipe detail
La vista de detalle SHALL incluir acciones de compartir junto a los controles de navegación existentes. El botón de compartir MUST estar disponible siempre que la receta haya cargado exitosamente.

#### Scenario: Botón de compartir visible con receta cargada
- **WHEN** la receta se obtiene exitosamente y se renderiza el detalle
- **THEN** el botón "Compartir por WhatsApp" MUST estar visible y accesible en la vista

#### Scenario: Botón de compartir no visible durante carga o error
- **WHEN** la receta está en estado de carga o error
- **THEN** el botón de compartir NO DEBE mostrarse
