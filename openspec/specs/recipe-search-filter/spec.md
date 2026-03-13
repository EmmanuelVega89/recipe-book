### Requirement: Text search by name and description
El sistema SHALL permitir al usuario buscar recetas escribiendo texto en un campo de búsqueda. La búsqueda MUST filtrar recetas cuyo nombre O descripción contengan el texto ingresado, de forma case-insensitive.

#### Scenario: Búsqueda por nombre
- **WHEN** el usuario escribe "tacos" en el campo de búsqueda
- **THEN** se muestran solo las recetas cuyo nombre contiene "tacos" (case-insensitive)

#### Scenario: Búsqueda por descripción
- **WHEN** el usuario escribe "postre" en el campo de búsqueda
- **THEN** se muestran las recetas cuya descripción contiene "postre" (case-insensitive)

#### Scenario: Búsqueda vacía
- **WHEN** el campo de búsqueda está vacío
- **THEN** no se aplica filtro por texto y se muestran todas las recetas (sujeto a otros filtros activos)

### Requirement: Category filter dropdown
El sistema SHALL mostrar un dropdown con las categorías obtenidas de `GET http://localhost:3001/categories` vía RTK Query. El usuario MUST poder seleccionar una categoría para filtrar las recetas.

#### Scenario: Dropdown cargado con categorías de la API
- **WHEN** el componente se monta
- **THEN** el dropdown muestra una opción "Todas las categorías" seguida de las categorías obtenidas del endpoint `/categories`

#### Scenario: Filtrar por categoría seleccionada
- **WHEN** el usuario selecciona "Postre" en el dropdown
- **THEN** se muestran solo las recetas cuya categoría es "Postre"

#### Scenario: Opción "Todas las categorías"
- **WHEN** el usuario selecciona "Todas las categorías"
- **THEN** no se aplica filtro por categoría y se muestran todas las recetas (sujeto a otros filtros activos)

### Requirement: Combined filters
Los filtros de búsqueda por texto y categoría MUST funcionar en combinación con lógica AND. Ambos filtros se aplican simultáneamente sobre la lista de recetas.

#### Scenario: Búsqueda y categoría combinados
- **WHEN** el usuario escribe "crema" en búsqueda y selecciona "Desayuno" como categoría
- **THEN** se muestran solo las recetas de categoría "Desayuno" cuyo nombre o descripción contiene "crema"

#### Scenario: Un filtro activo, otro vacío
- **WHEN** el usuario selecciona "Plato Fuerte" pero el campo de búsqueda está vacío
- **THEN** se muestran todas las recetas de categoría "Plato Fuerte"

### Requirement: Results counter
El sistema SHALL mostrar un contador de resultados que indique cuántas recetas coinciden con los filtros aplicados.

#### Scenario: Contador con resultados
- **WHEN** los filtros producen 3 recetas
- **THEN** se muestra el texto "3 recetas encontradas"

#### Scenario: Contador con un resultado
- **WHEN** los filtros producen 1 receta
- **THEN** se muestra el texto "1 receta encontrada"

### Requirement: Empty state with active filters
El sistema SHALL mostrar un estado vacío diferenciado cuando los filtros aplicados no producen resultados, distinto del estado vacío cuando no hay recetas en la API.

#### Scenario: Sin resultados por filtros
- **WHEN** la combinación de búsqueda y/o categoría no produce resultados pero hay recetas en la API
- **THEN** se muestra un mensaje indicando que no se encontraron recetas con los filtros aplicados

### Requirement: Category data fetching
El API slice MUST incluir un endpoint `getCategories` que obtenga las categorías desde `GET http://localhost:3001/categories`. El hook `useGetCategoriesQuery` MUST ser exportado.

#### Scenario: Fetch exitoso de categorías
- **WHEN** el componente de filtro se monta
- **THEN** RTK Query ejecuta `GET /categories` y retorna un array de objetos Category con las propiedades: id, name

#### Scenario: Error al cargar categorías
- **WHEN** la API de categorías falla
- **THEN** el dropdown de categorías no se renderiza pero el resto de la funcionalidad (búsqueda, listado) sigue operativa
