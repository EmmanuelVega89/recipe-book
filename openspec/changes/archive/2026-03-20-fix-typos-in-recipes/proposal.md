## Why

Los datos de recetas en `db.json` presentan tildes faltantes en nombres ("Cafe mono"), errores gramaticales en descripciones y unidades de medida sin formato consistente (mezcla de `200g`/`500ml`/`1kg` sin espacio y `1 taza`/`4 tazas` con texto completo). Esto afecta la legibilidad y la calidad del contenido mostrado en la app.

## What Changes

- Corregir tildes y ortografía en nombres y descripciones de recetas
- Unificar el formato de unidades de medida en ingredientes: espacio entre cantidad y unidad (`200 g`, `500 ml`, `1 kg`)
- Corregir errores gramaticales menores en descripciones

**In scope:**
- Datos en `db.json` — campos `name`, `description` e `ingredients` de recetas 1–10
- Receta 11 ("Cafe mono"): corrección de tilde y gramática
- Receta 12 ("dtryjfytfhd"): fuera de scope — es datos de prueba, no receta real

**Out of scope:**
- Cambios en el código fuente (`*.tsx`, `*.ts`)
- Eliminar recetas de prueba (11 y 12)
- Modificar campos `steps`, `category`, `difficulty`, `prepTime` o `imageUrl`

## Capabilities

### New Capabilities
- Ninguna

### Modified Capabilities
- Ninguna (cambio de datos, no de comportamiento)

## Impact

- **Modificado:** `db.json` — correcciones en campos de texto de recetas
- Sin impacto en código, API ni componentes
