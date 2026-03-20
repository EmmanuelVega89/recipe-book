## Why

Los usuarios del libro de recetas no tienen forma de compartir recetas fácilmente con otras personas. Agregar un botón de compartir por WhatsApp en la página de detalle aprovecha el canal de mensajería más usado, permitiendo difundir recetas con un solo toque sin salir de la app.

## What Changes

- Agregar un botón "Compartir por WhatsApp" en la página de detalle de receta
- Al presionarlo, abrir WhatsApp con un mensaje pre-formateado que incluya: nombre de la receta, categoría y enlace directo a la página de detalle
- El enlace en el mensaje debe apuntar a la URL actual del navegador (`window.location.href`)

**In scope:**
- Botón de compartir en la vista de detalle de receta únicamente
- Mensaje pre-formateado con nombre, categoría y URL
- Apertura vía `https://wa.me/?text=...` (funciona en móvil y escritorio)

**Out of scope:**
- Compartir en otras redes sociales
- Botón de compartir en la lista de recetas
- Tracking de clicks o analytics
- Web Share API como alternativa

## Capabilities

### New Capabilities
- `recipe-share`: Botón en el detalle de receta que abre WhatsApp con un mensaje pre-formateado incluyendo nombre, categoría y URL de la receta

### Modified Capabilities
- `recipe-detail`: Añadir el botón de compartir a la vista de detalle (cambio de UI, no de requisitos de datos)

## Impact

- **Modificado:** `src/features/recipes/components/RecipeDetail.tsx` — añadir botón de compartir
- **Sin nuevas dependencias:** El enlace de WhatsApp se construye con la URL de la API pública `https://wa.me/` y `window.location.href`, sin librerías adicionales
- **Sin cambios en API ni store:** Operación puramente de cliente
