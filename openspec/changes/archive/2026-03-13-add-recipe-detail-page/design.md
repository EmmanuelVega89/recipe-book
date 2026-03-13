## Context

La aplicación Recipe Book actualmente muestra un listado de recetas con búsqueda y filtro por categoría. No existe navegación entre vistas — `App.tsx` renderiza directamente `RecipeList`. Se necesita agregar enrutamiento y una vista de detalle para completar el flujo principal de la app.

El stack actual (React + TypeScript, RTK Query, Tailwind CSS v4, Vite) ya soporta todo lo necesario. Solo falta agregar `react-router-dom` como dependencia.

## Goals / Non-Goals

**Goals:**
- Permitir ver la información completa de una receta (ingredientes, pasos, descripción)
- Navegación fluida entre listado y detalle
- Mantener la consistencia visual con el diseño existente (Tailwind)

**Non-Goals:**
- Edición o creación de recetas (futuro cambio)
- Breadcrumbs o navegación compleja
- Pre-fetching o cache warming de recetas individuales

## Decisions

### D1: React Router v7 para enrutamiento
Usar `react-router-dom` v7 con `BrowserRouter`, `Routes` y `Route` en `App.tsx`.

**Alternativa considerada**: Enrutamiento manual con estado — descartado por no soportar deep linking ni botón atrás del navegador.

**Rationale**: Es el estándar de facto para React SPAs, soporta parámetros de ruta (`:id`), y la app ya necesitará routing para futuras vistas.

### D2: Endpoint RTK Query con `getRecipeById`
Agregar un endpoint `getRecipeById` al API slice existente que haga `GET /recipes/:id`. JSON Server ya soporta este endpoint nativamente.

**Alternativa considerada**: Filtrar del cache de `getRecipes` — descartado porque no funciona si el usuario accede directamente por URL sin pasar por el listado.

### D3: Layout compartido en App.tsx
El header y el contenedor `<main>` se mantienen en `App.tsx` como layout compartido. Las rutas solo cambian el contenido interno.

### D4: Link en RecipeCard
Envolver la card completa en un `<Link>` de React Router. Esto hace toda la card clickeable sin necesidad de un botón explícito "Ver detalle".

## Risks / Trade-offs

- [Dependencia nueva: react-router-dom] → Es una dependencia estable y ampliamente usada. Riesgo bajo.
- [Breaking change en App.tsx] → Envolver la app en `BrowserRouter` es un cambio estructural, pero no afecta comportamiento existente ya que la ruta `/` renderiza el mismo `RecipeList`.
