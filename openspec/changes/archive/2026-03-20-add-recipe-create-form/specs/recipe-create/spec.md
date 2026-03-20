## ADDED Requirements

### Requirement: Recipe creation form fields
El sistema SHALL presentar un formulario con los siguientes campos obligatorios: nombre (texto), descripción (textarea), ingredientes (lista dinámica), pasos de preparación (lista dinámica), categoría (dropdown), dificultad (selector Fácil/Media/Difícil), tiempo de preparación (número en minutos), y URL de imagen (texto con formato URL).

#### Scenario: Renderizado del formulario vacío
- **WHEN** el usuario navega a `/recipes/new`
- **THEN** el sistema muestra el formulario con todos los campos vacíos y al menos un campo vacío para ingrediente y un campo vacío para paso

#### Scenario: Carga de categorías en el dropdown
- **WHEN** el formulario se monta
- **THEN** el sistema ejecuta `GET /categories` y puebla el dropdown con las categorías disponibles

#### Scenario: Error al cargar categorías
- **WHEN** la petición `GET /categories` falla
- **THEN** el dropdown muestra un mensaje de error y el formulario sigue siendo utilizable con el resto de campos

### Requirement: Dynamic ingredient list
El sistema SHALL permitir al usuario agregar y eliminar ingredientes de forma dinámica. La lista MUST contener al menos un ingrediente al guardar.

#### Scenario: Agregar ingrediente
- **WHEN** el usuario hace clic en el botón "Agregar ingrediente"
- **THEN** se añade un nuevo campo de texto vacío al final de la lista de ingredientes

#### Scenario: Eliminar ingrediente
- **WHEN** el usuario hace clic en el botón de eliminar junto a un ingrediente
- **THEN** ese campo de ingrediente es removido de la lista
- **AND** el formulario conserva los valores de los demás ingredientes

#### Scenario: Ingrediente único no eliminable
- **WHEN** la lista de ingredientes tiene exactamente un campo
- **THEN** el botón de eliminar de ese campo SHALL estar deshabilitado o no visible

### Requirement: Dynamic preparation steps with reordering
El sistema SHALL permitir al usuario agregar, eliminar y reordenar los pasos de preparación. La lista MUST contener al menos un paso al guardar.

#### Scenario: Agregar paso
- **WHEN** el usuario hace clic en el botón "Agregar paso"
- **THEN** se añade un nuevo campo de texto vacío al final de la lista de pasos

#### Scenario: Eliminar paso
- **WHEN** el usuario hace clic en el botón de eliminar junto a un paso
- **THEN** ese paso es removido y los pasos restantes conservan su orden relativo

#### Scenario: Subir paso en la lista
- **WHEN** el usuario hace clic en el botón "subir" de un paso que no es el primero
- **THEN** el paso intercambia posición con el paso anterior

#### Scenario: Bajar paso en la lista
- **WHEN** el usuario hace clic en el botón "bajar" de un paso que no es el último
- **THEN** el paso intercambia posición con el paso siguiente

#### Scenario: Límites de reordenamiento
- **WHEN** un paso es el primero de la lista
- **THEN** el botón "subir" SHALL estar deshabilitado o no visible
- **WHEN** un paso es el último de la lista
- **THEN** el botón "bajar" SHALL estar deshabilitado o no visible

### Requirement: Form validation
El sistema SHALL validar todos los campos requeridos antes de permitir el envío. Los mensajes de error MUST mostrarse bajo el campo correspondiente y ser claros en español.

#### Scenario: Validación de campo nombre vacío
- **WHEN** el usuario intenta enviar el formulario con el campo nombre vacío
- **THEN** se muestra el mensaje de error "El nombre es requerido" bajo el campo nombre y el formulario NO se envía

#### Scenario: Validación de descripción vacía
- **WHEN** el usuario intenta enviar el formulario con la descripción vacía
- **THEN** se muestra el mensaje "La descripción es requerida" y el formulario NO se envía

#### Scenario: Validación de ingrediente vacío
- **WHEN** el usuario intenta enviar con algún campo de ingrediente vacío
- **THEN** se muestra el mensaje "Ingresa el ingrediente" en el campo vacío y el formulario NO se envía

#### Scenario: Validación de paso vacío
- **WHEN** el usuario intenta enviar con algún campo de paso vacío
- **THEN** se muestra el mensaje "Ingresa el paso" en el campo vacío y el formulario NO se envía

#### Scenario: Validación de categoría no seleccionada
- **WHEN** el usuario intenta enviar sin seleccionar categoría
- **THEN** se muestra el mensaje "Selecciona una categoría" y el formulario NO se envía

#### Scenario: Validación de tiempo de preparación inválido
- **WHEN** el usuario intenta enviar con tiempo de preparación vacío o menor a 1
- **THEN** se muestra el mensaje "El tiempo debe ser mayor a 0" y el formulario NO se envía

#### Scenario: Validación de URL de imagen inválida
- **WHEN** el usuario ingresa texto que no es una URL válida en el campo de imagen
- **THEN** se muestra el mensaje "Ingresa una URL válida" y el formulario NO se envía

#### Scenario: Formulario válido sin errores
- **WHEN** todos los campos tienen valores válidos y el usuario hace clic en "Guardar receta"
- **THEN** no se muestran mensajes de error y el formulario procede al envío

### Requirement: Recipe persistence via POST /recipes
El sistema SHALL enviar los datos del formulario al endpoint `POST /recipes` usando una mutación RTK Query. Tras una creación exitosa, el usuario SHALL ser redirigido a la página de detalle de la receta creada.

#### Scenario: Envío exitoso
- **WHEN** el formulario es válido y el usuario hace clic en "Guardar receta"
- **THEN** el sistema ejecuta `POST /recipes` con el payload de la receta
- **AND** tras recibir la respuesta exitosa, navega a `/recipes/:id` con el ID devuelto por la API

#### Scenario: Estado de carga durante envío
- **WHEN** el sistema está procesando la petición `POST /recipes`
- **THEN** el botón de guardar SHALL mostrar un indicador de carga y estar deshabilitado para evitar envíos duplicados

#### Scenario: Error en la creación
- **WHEN** la petición `POST /recipes` retorna un error
- **THEN** el sistema muestra un mensaje de error general visible al usuario y el formulario permanece con los datos ingresados

### Requirement: Create recipe page navigation
El sistema SHALL proveer una ruta `/recipes/new` que renderice el formulario de creación. El formulario SHALL incluir un botón o enlace para cancelar y regresar a la lista de recetas.

#### Scenario: Acceso directo a la ruta
- **WHEN** el usuario navega directamente a `/recipes/new`
- **THEN** el sistema renderiza el formulario de creación sin redirigir a otra ruta

#### Scenario: Cancelar creación
- **WHEN** el usuario hace clic en el botón "Cancelar"
- **THEN** el sistema navega a `/` (lista de recetas) sin guardar ningún dato
