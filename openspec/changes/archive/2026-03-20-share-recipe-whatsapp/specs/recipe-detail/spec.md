## ADDED Requirements

### Requirement: Share action in recipe detail
La vista de detalle SHALL incluir acciones de compartir junto a los controles de navegación existentes. El botón de compartir MUST estar disponible siempre que la receta haya cargado exitosamente.

#### Scenario: Botón de compartir visible con receta cargada
- **WHEN** la receta se obtiene exitosamente y se renderiza el detalle
- **THEN** el botón "Compartir por WhatsApp" MUST estar visible y accesible en la vista

#### Scenario: Botón de compartir no visible durante carga o error
- **WHEN** la receta está en estado de carga o error
- **THEN** el botón de compartir NO DEBE mostrarse
