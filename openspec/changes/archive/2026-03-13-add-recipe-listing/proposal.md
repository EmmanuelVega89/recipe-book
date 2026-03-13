## Why

La aplicación Recipe Book actualmente solo muestra un encabezado vacío. Los usuarios necesitan poder ver todas las recetas disponibles para descubrir qué cocinar. El listado de recetas es la funcionalidad principal y punto de entrada de la aplicación.

## What Changes

- Agregar una página principal que muestra todas las recetas en formato de cards grid
- Cada card muestra: imagen, nombre, categoría, dificultad y tiempo de preparación
- Configurar RTK Query como capa de data fetching contra la API mock (`GET /recipes`)
- Integrar el API slice de RTK Query en el Redux store existente

## Capabilities

### New Capabilities

- `recipe-listing`: Página principal con grid de recipe cards que muestra las recetas obtenidas de la API. Incluye el componente de listado, las recipe cards, los tipos del dominio y la configuración de RTK Query.

### Modified Capabilities

_(ninguna — no existen capabilities previas)_

## Impact

- **Código nuevo**: Feature module en `src/features/recipes/` con componentes, tipos y API slice
- **Código modificado**: `src/store/store.ts` (agregar RTK Query reducer y middleware), `src/App.tsx` (renderizar el listado)
- **Dependencias**: RTK Query ya viene incluido en `@reduxjs/toolkit` — no se requieren instalaciones adicionales
- **API**: Consumo de `GET http://localhost:3001/recipes` vía RTK Query
