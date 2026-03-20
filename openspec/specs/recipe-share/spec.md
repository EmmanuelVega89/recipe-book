### Requirement: WhatsApp share button
El sistema SHALL mostrar un botón "Compartir por WhatsApp" en la página de detalle de receta. Al presionarlo, MUST abrir WhatsApp (app o web) con un mensaje pre-formateado que incluya el nombre de la receta, la categoría y un enlace directo a la página de detalle.

#### Scenario: Botón visible en el detalle
- **WHEN** el usuario accede a la página de detalle de una receta
- **THEN** el sistema muestra un botón "Compartir por WhatsApp" visible junto a la información de la receta

#### Scenario: Apertura de WhatsApp con mensaje pre-formateado
- **WHEN** el usuario hace clic en el botón "Compartir por WhatsApp"
- **THEN** el sistema abre una nueva pestaña o ventana apuntando a `https://wa.me/?text=<mensaje_codificado>`
- **AND** el mensaje MUST contener el nombre de la receta, la categoría y la URL actual de la página

#### Scenario: Formato del mensaje compartido
- **WHEN** se construye el mensaje para WhatsApp
- **THEN** el mensaje MUST seguir el formato: "¡Mira esta receta! 🍽️ *<nombre>* | Categoría: <categoría> <URL>"
- **AND** el texto MUST estar codificado como URL válida (encodeURIComponent)

#### Scenario: Enlace apunta a la receta correcta
- **WHEN** el usuario comparte la receta desde `/recipes/5`
- **THEN** la URL incluida en el mensaje MUST ser la URL completa de esa página de detalle (`window.location.href`)
