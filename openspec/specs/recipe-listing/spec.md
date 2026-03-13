### Requirement: Recipe data fetching via RTK Query
El sistema SHALL obtener la lista de recetas desde `GET http://localhost:3001/recipes` utilizando RTK Query. El API slice MUST exportar un hook `useGetRecipesQuery` que los componentes consuman directamente.

#### Scenario: Fetch exitoso de recetas
- **WHEN** el componente RecipeList se monta
- **THEN** RTK Query ejecuta `GET /recipes` y retorna un array de objetos Recipe con las propiedades: id, name, description, category, difficulty, prepTime, imageUrl

#### Scenario: Error de conexión con la API
- **WHEN** la API no está disponible o retorna un error
- **THEN** el hook retorna `isError: true` y el componente muestra un mensaje de error al usuario

### Requirement: Recipe list display
El sistema SHALL mostrar las recetas filtradas en un grid responsive de cards. El grid MUST usar 1 columna en mobile, 2 en tablet y 3 en desktop. Sobre el grid MUST mostrarse una barra de filtros (búsqueda y categoría) y un contador de resultados.

#### Scenario: Renderizado del grid con recetas
- **WHEN** las recetas se obtienen exitosamente de la API
- **THEN** se renderiza la barra de filtros seguida del contador de resultados y una card por cada receta filtrada en un layout grid responsive

#### Scenario: Estado de carga
- **WHEN** la petición a la API está en progreso (`isLoading: true`)
- **THEN** se muestra un indicador de carga visible al usuario

#### Scenario: Lista vacía
- **WHEN** la API retorna un array vacío de recetas
- **THEN** se muestra un mensaje indicando que no hay recetas disponibles

#### Scenario: Sin resultados por filtros activos
- **WHEN** hay recetas en la API pero los filtros aplicados no producen resultados
- **THEN** se muestra un mensaje diferenciado indicando que no se encontraron recetas con los filtros actuales

### Requirement: Recipe card content
Cada recipe card SHALL mostrar: imagen de la receta, nombre, categoría, nivel de dificultad y tiempo de preparación. La card MUST ser un componente presentacional que reciba un objeto Recipe como prop.

#### Scenario: Card muestra toda la información requerida
- **WHEN** se renderiza una RecipeCard con un objeto Recipe válido
- **THEN** la card muestra la imagen (usando imageUrl), el nombre de la receta, un badge con la categoría, el nivel de dificultad y el tiempo de preparación formateado (ej: "25 min")

#### Scenario: Imagen de la receta
- **WHEN** la card renderiza la imagen
- **THEN** la imagen MUST tener un atributo alt con el nombre de la receta y MUST mostrarse con aspect ratio consistente

### Requirement: Recipe type definition
El sistema SHALL definir una interface TypeScript `Recipe` que refleje la estructura de datos de la API. El tipo MUST ser exportado desde el feature module para uso en otros componentes.

#### Scenario: Estructura del tipo Recipe
- **WHEN** se define la interface Recipe
- **THEN** MUST incluir las propiedades: id (number), name (string), description (string), ingredients (string[]), steps (string[]), category (string), difficulty (string), prepTime (number), imageUrl (string)

### Requirement: Store integration
El API slice de RTK Query MUST estar integrado en el Redux store global. El store MUST incluir el reducer y middleware del API slice.

#### Scenario: Configuración del store con RTK Query
- **WHEN** la aplicación se inicializa
- **THEN** el store incluye el reducer de `recipesApi` y el middleware de RTK Query está configurado en la cadena de middlewares
