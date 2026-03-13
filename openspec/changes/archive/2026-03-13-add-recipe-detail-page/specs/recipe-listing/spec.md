## MODIFIED Requirements

### Requirement: Recipe card content
Cada recipe card SHALL mostrar: imagen de la receta, nombre, categoría, nivel de dificultad y tiempo de preparación. La card MUST ser un componente presentacional que reciba un objeto Recipe como prop. La card MUST ser clickeable y navegar a la ruta `/recipes/:id` de la receta correspondiente.

#### Scenario: Card muestra toda la información requerida
- **WHEN** se renderiza una RecipeCard con un objeto Recipe válido
- **THEN** la card muestra la imagen (usando imageUrl), el nombre de la receta, un badge con la categoría, el nivel de dificultad y el tiempo de preparación formateado (ej: "25 min")

#### Scenario: Imagen de la receta
- **WHEN** la card renderiza la imagen
- **THEN** la imagen MUST tener un atributo alt con el nombre de la receta y MUST mostrarse con aspect ratio consistente

#### Scenario: Navegación al detalle desde la card
- **WHEN** el usuario hace clic en una RecipeCard
- **THEN** la aplicación navega a `/recipes/:id` donde `:id` es el ID de la receta
