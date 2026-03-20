## ADDED Requirements

### Requirement: Navigation to recipe creation
El sistema SHALL mostrar un botón "Nueva Receta" en la página de listado de recetas. Al hacer clic, el usuario SHALL ser navegado a `/recipes/new`.

#### Scenario: Botón visible en el listado
- **WHEN** el usuario está en la página de listado de recetas (`/`)
- **THEN** el sistema muestra un botón o enlace "Nueva Receta" visible y accesible

#### Scenario: Navegación al formulario
- **WHEN** el usuario hace clic en el botón "Nueva Receta"
- **THEN** la aplicación navega a `/recipes/new` y renderiza el formulario de creación
