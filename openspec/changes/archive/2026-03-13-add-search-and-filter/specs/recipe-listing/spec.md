## MODIFIED Requirements

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
