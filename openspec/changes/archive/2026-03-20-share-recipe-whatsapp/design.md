## Context

La vista de detalle de receta (`RecipeDetail.tsx`) ya muestra toda la información de la receta obtenida vía RTK Query. No existe mecanismo de compartir. El proyecto no usa ninguna librería de social sharing. La función de compartir es puramente de cliente: construir una URL de WhatsApp y abrirla.

**Archivo relevante:** `src/features/recipes/components/RecipeDetail.tsx`

## Goals / Non-Goals

**Goals:**
- Añadir un botón "Compartir por WhatsApp" en `RecipeDetail`
- Construir el mensaje con: nombre de receta, categoría y URL actual
- Abrir WhatsApp al hacer clic usando `https://wa.me/?text=<encoded>`

**Non-Goals:**
- Compartir desde otras vistas (listado, formulario)
- Otras redes sociales o Web Share API
- Tracking de compartidos

## Decisions

### 1. URL scheme `wa.me/?text=` en lugar de Web Share API

**Decisión:** Usar `https://wa.me/?text=${encodeURIComponent(message)}` directamente.

**Razón:** La Web Share API requiere HTTPS y soporte del navegador (no disponible en todos los escritorios). `wa.me` funciona en móvil (abre la app) y en escritorio (abre WhatsApp Web), sin dependencias adicionales y con soporte universal.

**Alternativa descartada:** `navigator.share()` — inconsistente en escritorio y requiere manejo de fallback.

---

### 2. URL de la receta desde `window.location.href`

**Decisión:** Usar `window.location.href` para obtener la URL a compartir.

**Razón:** La app no tiene configuración de dominio base. `window.location.href` devuelve siempre la URL correcta en el contexto actual, sin necesidad de hardcodear el dominio. Suficiente para el alcance del proyecto.

---

### 3. Función helper inline en el componente, no en utilidad compartida

**Decisión:** Definir `buildWhatsAppUrl(recipe)` directamente dentro de `RecipeDetail.tsx`.

**Razón:** La función es específica de este componente y no existe otro lugar que la reutilice ahora. Extraerla a un helper sería prematura. Si en el futuro se añade compartir en más vistas, se puede extraer entonces.

## Risks / Trade-offs

- **[Riesgo] URL localhost en desarrollo** → En desarrollo, la URL compartida será `localhost:5173/recipes/:id`, que no funciona para el destinatario. Mitigación: comportamiento esperado en dev; en producción la URL será correcta.
- **[Trade-off] `window.location.href` no es testeable sin mock** → Aceptado; la función es trivial y el riesgo es bajo.

## Files Changed

**Modificados:**
- `src/features/recipes/components/RecipeDetail.tsx` — añadir botón de compartir con lógica inline
